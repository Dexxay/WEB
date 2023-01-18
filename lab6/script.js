var dictionary = {};

function createAccordionElement(parentId) {
    let parent = document.getElementById(parentId);
    let index = 1;
    if (parentId in dictionary) {
        index = dictionary[parentId];
        dictionary[parentId] = index + 1;
    }
    else {
        dictionary[parentId] = 2;
    }

    let item_div = document.createElement("div");
    item_div.className = "item";
    let div_id = index + parentId;
    item_div.id = div_id;
    parent.appendChild(item_div);

    let element = document.createElement("button");
    element.className = "accordion-element";
    element.innerHTML = "Item " + index;
    item_div.appendChild(element);


    let delete_element = document.createElement("button");
    delete_element.className = "delete-item";
    delete_element.innerHTML = "Delete";
    delete_element.setAttribute("onclick", "remove_by_index('" + div_id + "','" + parentId + "')");
    item_div.appendChild(delete_element);

    let object_text = document.createElement("p");
    object_text.className = "accordion-text";
    object_text.innerHTML = 'Simple text. You can change it by double clicking on it';

    object_text.style.fontSize = "20px";
    object_text.style.textAlign = "center";

    parent.appendChild(object_text);

    element.addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = object_text;

        if (panel.style.maxHeight) {
            panel.style.margin = "0px";
            panel.style.maxHeight = null;
        }

        else {
            panel.style.margin = "0px";
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });

    object_text.addEventListener("dblclick", function () {
        let old_text = object_text.textContent;
        object_text.innerHTML = "";

        let block = document.createElement("div");
        block.className = "form";

        let textArea = document.createElement("textarea");
        textArea.value = old_text;

        textArea.placeholder = " Type in your text here";
        textArea.style.width = "100%";
        textArea.style.fontSize = "20px";
        textArea.style.alignContent = "center";
        block.appendChild(textArea);

        let applyButton = document.createElement("button");
        applyButton.className = "apply_button"
        applyButton.style.fontSize = "20px";
        applyButton.style.width = "50%";
        applyButton.style.alignContent = "center";

        applyButton.onclick = function () {
            if (textArea.value == '') {
                this.parentNode.innerHTML = old_text;
            }
            else {
                this.parentNode.innerHTML = textArea.value;
            }
        };
        applyButton.innerHTML = "Apply changes";
        block.appendChild(applyButton);

        this.appendChild(block);
        this.style.maxHeight = block.scrollHeight + "px";
    });
}

function remove_by_index(id_to_remove, parent_id) {
    var parent = document.getElementById(parent_id);
    let element_to_remove = document.getElementById(id_to_remove);
    parent.removeChild(element_to_remove.nextSibling);
    parent.removeChild(element_to_remove);
}