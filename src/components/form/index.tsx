import { HTMLProps } from "react";

export function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea
            id="tarefa"
            name="tarefa"
            placeholder="Digite sua tarefa..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 text-sm"
            rows={3}
            {...rest}
        />
    );
}
