import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
export default function RTE({ name, control, label, defaultValue = "" }) {

    // console.log("TinyMCE API Key:", process.env.VITE_APP_TINYMCE_API_KEY); // Debugging
    return (
        <div className='w-full'>
            {
                label && <label className='inline-block mb-1 pl-1'>{label}</label>
            }

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor

                       apiKey="liostgz4r2orrgof34q2fmrugg9e0qcji6po3soiuhu2cifu" 
                       initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />

                )}

            />
        </div>
    )
}


