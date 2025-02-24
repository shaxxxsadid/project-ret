'use client';
interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    title?: string
}

export function Modal({ isOpen, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 p-6 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
                {/* Заголовок и кнопка закрытия */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
                </div>
                {/* Контент модального окна */}
                <div className="mt-4 text-gray-600">{children}</div>
            </div>
        </div>
    );
};   