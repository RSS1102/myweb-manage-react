import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from "tinymce";
// 添加prismjs全局样式，以用来高亮代码(安装prismjs后，可以在编辑器中使用prismjs高亮代码)
//   codesample_global_prismjs: true,设置以允许使用 Prism 的全局实例而不是嵌入式版本
// https://github.com/tinymce/tinymce/issues/5303
import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-dark.css';
import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events"
interface EditorProps {
    onEdit?: EventHandler<any>
    value?: string
}
export default function MyEditor(props: EditorProps) {
    const editorRef = useRef<TinyMCEEditor>();

    return (
        <>
            <Editor
                apiKey='nnhndkfj0yhexayfk80mxz0szlnvenzg12b1akg9l2krzqth'
                onInit={(_, editor) => editorRef.current = editor}
                initialValue=""
                onEditorChange={props.onEdit}
                init={{
                    height: 500,
                    menubar: false,// 取消顶部菜单
                    branding: false, // 去掉tinymce的logo
                    language: "zh_CN", //语言类型
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount',
                        'codesample', "image"
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic  forecolor removeformat | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        ' codesample|image',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    // 代码高亮设置
                    codesample_global_prismjs: true,
                    codesample_languages: [
                        { text: 'HTML/XML', value: 'markup' },
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'CSS', value: 'css' },
                        { text: 'PHP', value: 'php' },
                        { text: 'Ruby', value: 'ruby' },
                        { text: 'Python', value: 'python' },
                        { text: 'Java', value: 'java' },
                        { text: 'C', value: 'c' },
                        { text: 'C#', value: 'csharp' },
                        { text: 'C++', value: 'cpp' },
                        { text: 'JSON', value: 'json' },
                        { text: 'SQL', value: 'sql' },
                        { text: 'Markdown', value: 'markdown' },
                        { text: 'Perl', value: 'perl' },
                        { text: 'typescript', value: 'typescript' }
                    ],
                    // 上传图片
                    images_upload_url: '/cweb/cBlogs/upLoadFile',//上传图片的接口
                    images_upload_base_path: 'http://localhost:3003/files',//上传图片的路径
                }}
            />

        </>
    );
}
