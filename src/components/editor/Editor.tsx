import React, { useCallback, useMemo, useState } from 'react'
import { BsTypeBold } from 'react-icons/bs';
import { GoItalic } from 'react-icons/go';

import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    BaseEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight, FiUnderline } from 'react-icons/fi';
import { BiStrikethrough } from 'react-icons/bi';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaListOl, FaListUl } from 'react-icons/fa';

// import { button, span, Toolbar } from '../components'

const HOTKEYS: Record<string, string> = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}


const RichTextEditor = ({ placeholder = 'Enter some rich text…' }) => {
    const renderElement = useCallback((props: any) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Slate editor={editor} value={initialValue}>
            <div className='flex items-center gap-4 flex-wrap mb-4 xs:gap-3'>
                <MarkButton format="bold" span={<BsTypeBold />} />
                <MarkButton format="italic" span={<GoItalic />} />
                <MarkButton format="underline" span={<FiUnderline />} />
                <MarkButton format="strikethrough" span={<BiStrikethrough />} />
                {/* <MarkButton format="code" span="code" />
                <BlockButton format="heading-one" span="looks_one" />
                <BlockButton format="heading-two" span="looks_two" />
                <BlockButton format="block-quote" span="format_quote" /> */}
                <BlockButton format="numbered-list" span={<FaListOl />} />
                <BlockButton format="bulleted-list" span={<FaListUl />} />
                <BlockButton format="left" span={<FaAlignLeft />} />
                <BlockButton format="center" span={<FaAlignCenter />} />
                <BlockButton format="right" span={<FaAlignRight />} />
                <BlockButton format="justify" span={<FaAlignJustify />} />
            </div>
            <Editable
                className='h-[170px] border border-primary-stroke rounded-lg p-4 w-full focus:border-primary-purple focus:bg-primary-purple focus:bg-opacity-5 text-body text-sm list-outside'
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder={placeholder}
                // spellCheck
                autoFocus
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

const toggleBlock = (editor: any, format: any) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: any
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor: BaseEditor & ReactEditor, format: any) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor: BaseEditor & ReactEditor, format: any, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n: Record<string, any>) => {
                const isTrue = n[blockType] === format;
                return (!Editor.isEditor(n) && SlateElement.isElement(n) && isTrue);
            }

        })
    )

    return !!match
}

const isMarkActive = (editor: any, format: any) => {
    const marks = Editor.marks(editor) as any;
    return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            console.log('bulleted-list');
            return (
                <ul className='list-disc pl-4' style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            console.log('numbered-list');
            return (
                <ol className='list-decimal pl-4' style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const Leaf = ({ attributes, children, leaf }: { attributes: any, children: any, leaf: any }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.strikethrough) {
        children = <span style={{ textDecoration: 'line-through' }}>{children}</span>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, span }: any) => {
    const editor = useSlate()
    return (
        <button
            className={`text-base  ${isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type') ? 'text-black' : 'text-primary'}`}
            // active={isBlockActive(
            //     editor,
            //     format,
            //     TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            // )}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <span>{span}</span>
        </button>
    )
}

const MarkButton = ({ format, span }: any) => {
    const editor = useSlate()
    return (
        <button
            className={`text-base  ${isMarkActive(editor, format) ? 'text-black' : 'text-primary'}`}
            // active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <span>{span}</span>
        </button>
    )
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: '' },
        ],
    },
];

export default RichTextEditor