//! Classes
class TemplateGroup {
    constructor(name) {
        this.name = name;
        this.ids = [];
        this.attributes = {};
        this.displayElement = null;
    }

    addId(id) {
        if (this.ids.find(element => element == id)) {
            return false
        }
        else {
            this.ids.push(id.trim());
            console.log(`Added ID: ${id} to group ${this.name}`);
            this.drawIds();
            return true
        }
    }

    delId(id) {
        this.ids.splice(this.ids.indexOf(id), 1);
    }

    setAttrib(key, value) {
        this.attributes[key] = value;
        console.log(`Attribute set: ${key} set to ${value} for group ${this.name}`);
    }

    drawIds() {
        if (this.displayElement != null) {
            const id_container = this.displayElement.querySelector("div#container_ids");
            id_container.innerHTML = "";

            this.ids.forEach(element => {
                id_container.innerHTML += `<li>${element} - ${Object.values(this.attributes)}</li>`;
            });
        }
        else {
            console.error(`Unable to draw ID list for group ${this.name}`);
            return false
        }
    }

    drawAttribs() {
        
    }
}

//! Variables
var groups = [];

console.log("Script loaded.");
//! Containers
const container_groups = document.querySelector("div#container_groups");

//! Templates
const template_group = document.querySelector("template#group");
const template_attribute = document.querySelector("template#attribute");

//! Buttons
const button_new_group = document.querySelector("button#new_group");
button_new_group.addEventListener("click", () => createNewGroup());

const btn_save = document.querySelector("button#save");
btn_save.addEventListener("click", () => saveBtnEventHandler());

//! Functions
function createNewGroup() {
    const group = new TemplateGroup(groups.length);
    groups.push(group);
    
    // Create display elements
    const element = template_group.content.firstElementChild.cloneNode(true);
    createNewAttribute(element.querySelector("div#container_attributes"), group.name);
    
    const input_id = element.querySelector("input#id_entry");
    input_id.setAttribute("data-groupID", group.name);
    input_id.addEventListener("change", (event) => idEntryHandler(event));
   
    group.displayElement = element;
    container_groups.appendChild(element);
}

function createNewAttribute(parentNode, groupID) {
    const attribute = template_attribute.content.firstElementChild.cloneNode(true);
    attribute.setAttribute("data-last", true);
    parentNode.appendChild(attribute);
    
    const select = attribute.querySelector("select");
    // const input = attribute.querySelector("input");
    
    select.addEventListener("change", (event) => {
        // input.value = "";
        groups[groupID].setAttrib("security_level", event.target.value);
        groups[groupID].drawIds();
    });

    /*
    input.addEventListener("change", (event) => {
        if (select.value != "") {
            // groups[groupID].setAttrib(select.value, event.target.value);
            
            if (attribute.getAttribute("data-last")) {
                attribute.removeAttribute("data-last");
                createNewAttribute(parentNode, groupID);
            }
        }
    });
    */
   
    groups[groupID].setAttrib("security_level", select.value);
    return attribute;
}

//! Event Handlers
function saveBtnEventHandler() {
    const headers = Object.keys(groups[0].attributes);
    console.log("id,", headers);
    groups.forEach((group, index) => {
        const rows = group.ids;
        group.ids.forEach((element) => {
            console.log(element, Object.values(group.attributes));
        });
    })
}

function idEntryHandler(event) {
    const groupID = event.target.getAttribute("data-groupID");
    const value = event.target.value;
    if (value != "") {
        if (groups[groupID].addId(value)) {
            // err: id already exists
        }
        
        event.target.value = "";
    }
}

