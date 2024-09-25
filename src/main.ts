import 'prosemirror-view/style/prosemirror.css';

import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {DOMParser} from "prosemirror-model"
import {baseKeymap} from "prosemirror-commands"

let content = document.getElementById("content")
if (content == null) {
    throw new Error("Content element not found")
}

// (The null arguments are where you can specify attributes, if necessary.)
let doc = schema.node("doc", null, [
    schema.node("paragraph", null, [schema.text("One.")]),
    schema.node("horizontal_rule"),
    schema.node("paragraph", null, [schema.text("Two!")])
])

let state = EditorState.create({
    // doc: DOMParser.fromSchema(schema).parse(content),
    doc: doc,
    plugins: [
        history(),
        keymap({"Mod-z": undo, "Mod-y": redo}),
        keymap(baseKeymap)
    ]
})

// @ts-ignore
let view = new EditorView(document.body, {state})