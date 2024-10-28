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
	// Combined state as a single object
	const [formState, setFormState] = useState({
		isSideMenuOpen: false,
		selectedFont: defaultArticleState.fontFamilyOption,
		selectedFontSize: defaultArticleState.fontFamilyOption,
		selectedFontColor: defaultArticleState.fontColor,
		selectedBackgroundColor: defaultArticleState.backgroundColor,
		selectedContentWidth: defaultArticleState.contentWidth,
	});

	const formReference = useRef<HTMLDivElement>(null);

	// Generic handler for all form field changes
	const handleFieldChange = (field: string, value: unknown): void => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const toggleSideMenu = (): void => {
		setFormState((prev) => ({ ...prev, isSideMenuOpen: !prev.isSideMenuOpen }));
	};

	const resetForm = (): void => {
		setArticleState(defaultArticleState);
		setFormState({
			isSideMenuOpen: false,
			selectedFont: defaultArticleState.fontFamilyOption,
			selectedFontSize: defaultArticleState.fontFamilyOption,
			selectedFontColor: defaultArticleState.fontColor,
			selectedBackgroundColor: defaultArticleState.backgroundColor,
			selectedContentWidth: defaultArticleState.contentWidth,
		});
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
		const {
			selectedFont,
			selectedFontSize,
			selectedFontColor,
			selectedBackgroundColor,
			selectedContentWidth,
		} = formState;

		setArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});

		handleFieldChange('isSideMenuOpen', false);
	};

	useEffect(() => {
		if (!formState.isSideMenuOpen) return;

		const handleClickOutside = (event: MouseEvent): void => {
			if (
				formReference.current &&
				!formReference.current.contains(event.target as Node)
			) {
				handleFieldChange('isSideMenuOpen', false);
			}
		};

		const handleEscDown = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				handleFieldChange('isSideMenuOpen', false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscDown);
		};
	}, [formState.isSideMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={formState.isSideMenuOpen}
				toggleArrow={toggleSideMenu}
			/>
			<aside
				ref={formReference}
				className={`${styles.container} ${
					formState.isSideMenuOpen ? styles.container_open : ''
				}`}
				style={{ backgroundColor: formState.selectedFontColor.value }}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.formHeader}>Задайте параметры</h2>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.selectedFont}
						placeholder='Выберите шрифт'
						onChange={(selected) =>
							selected && handleFieldChange('selectedFont', selected)
						}
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.selectedFontSize}
						onChange={(value) => handleFieldChange('selectedFontSize', value)}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.selectedFontColor}
						placeholder='Выберите цвет шрифта'
						onChange={(selected) =>
							selected && handleFieldChange('selectedFontColor', selected)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.selectedBackgroundColor}
						placeholder='Выберите цвет фона'
						onChange={(selected) =>
							selected && handleFieldChange('selectedBackgroundColor', selected)
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.selectedContentWidth}
						placeholder='Выберите ширину контента'
						onChange={(selected) =>
							selected && handleFieldChange('selectedContentWidth', selected)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
