import React, { useEffect } from 'react';

type UseOutsideClickProps = {
	isOpen: boolean;
	onClose: () => void;
	ref: React.RefObject<HTMLElement>;
};

export const useOutsideClick = ({
	isOpen,
	onClose,
	ref,
}: UseOutsideClickProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscDown = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscDown);
		};
	}, [isOpen, onClose, ref]);
};
