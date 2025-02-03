"use client";

import React, { useEffect, useState } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { InputLabel } from "@mui/material";
import htmlToDraft from "html-to-draftjs";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const textAreaValue = (editorState) => {
  const content = editorState.getCurrentContent();
  const rawContent = convertToRaw(content);
  const html = draftToHtml(rawContent);

  return html.replace(/<p><\/p>/gi, "<br/>");
};

const FormEditor = ({
  name,
  label,
  inputs = {},
  errors = {},
  defaultValue = "",
}) => {
  const [editorState, setEditorState] = useState(
    defaultValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(defaultValue).contentBlocks
          )
        )
      : EditorState.createEmpty()
  );

  useEffect(() => {
    inputs[name] = textAreaValue(editorState);
  }, [editorState]);

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <textarea
        id={name}
        name={name}
        value={textAreaValue(editorState)}
        readOnly
        rows={5}
        style={{ width: "100%" }}
      />
    </>
  );
};

export default FormEditor;
