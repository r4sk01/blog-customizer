import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Select } from 'components/select';

import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';

import {
	defaultArticleState,
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsProps): ReactElement => {
	// States
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const openSideMenu = (): void => {
		setIsSideMenuOpen((prevState) => !prevState);
	};

	// Reference
	const formReference = useRef<HTMLDivElement>(null);

	// Customization Handlers
	const handleFontFamilyChange = (
		fontFamily: typeof defaultArticleState.fontFamilyOption
	): void => {
		setSelectedFont(fontFamily);
		console.log(`Вы выбрали шрифт: ${fontFamily.title}`);
	};
	const handleFontSizeChange = (
		size: typeof defaultArticleState.fontSizeOption
	): void => {
		setSelectedFontSize(size);
		console.log(`Font size is: ${size.title}`);
	};
	const handleFontColorChange = (
		color: typeof defaultArticleState.fontColor
	): void => {
		setSelectedFontColor(color);
		console.log(`Font color is: ${color.title}`);
	};
	const handleBackgroundColorChange = (
		bgColor: typeof defaultArticleState.backgroundColor
	): void => {
		setSelectedBackgroundColor(bgColor);
		console.log(`Background color is: ${bgColor.title}`);
	};
	const handleContentWidthChange = (
		width: typeof defaultArticleState.contentWidth
	): void => {
		setSelectedContentWidth(width);
		console.log(`Content width is: ${width.title}`);
	};

	// Events Handlers for Form

	const formResetHandler = () => {
		setArticleState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setIsSideMenuOpen(false);
	};

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
		setIsSideMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				formReference.current &&
				!formReference.current.contains(event.target as Node)
			) {
				setIsSideMenuOpen(false);
			}
		};

		const handleEscDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsSideMenuOpen(false);
			}
		};

		if (isSideMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscDown);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscDown);
		};
	}, [isSideMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isSideMenuOpen} toggleArrow={openSideMenu} />
			<aside
				ref={formReference}
				className={`${styles.container} ${
					isSideMenuOpen ? styles.container_open : ''
				}`}
				style={{ backgroundColor: selectedFontColor.value }}>
				<form className={styles.form} onSubmit={formSubmitHandler}>
					<h2 className={styles.formHeader}>Задайте параметры</h2>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={selectedFont}
						placeholder='Выберите шрифт'
						onChange={(selected) =>
							selected && handleFontFamilyChange(selected)
						}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						placeholder='Выберите цвет шрифта'
						onChange={(selected) => selected && handleFontColorChange(selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						placeholder='Выберите цвет фона'
						onChange={(selected) =>
							selected && handleBackgroundColorChange(selected)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedContentWidth}
						placeholder='Выберите ширину контента'
						onChange={(selected) =>
							selected && handleContentWidthChange(selected)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formResetHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
