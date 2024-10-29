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
import { useOutsideClick } from 'components/article-params-form/hooks/useOutsideClick';

type ArticleParamsProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsProps): ReactElement => {
	// UI state
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	// Form state
	const [formState, setFormState] = useState(defaultArticleState);

	const formReference = useRef<HTMLDivElement>(null);

	useOutsideClick({
		isOpen: isSideMenuOpen,
		onClose: () => setIsSideMenuOpen(false),
		ref: formReference,
	});

	const handleFieldChange = (
		field: keyof ArticleStateType,
		value: unknown
	): void => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const toggleSideMenu = (): void => {
		setIsSideMenuOpen((prev) => !prev);
	};

	const resetForm = (): void => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsSideMenuOpen(false);
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
		setArticleState(formState);
		setIsSideMenuOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSideMenuOpen} toggleArrow={toggleSideMenu} />
			<aside
				ref={formReference}
				className={`${styles.container} ${
					isSideMenuOpen ? styles.container_open : ''
				}`}
				style={{ backgroundColor: formState.fontColor.value }}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.formHeader}>Задайте параметры</h2>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						placeholder='Выберите шрифт'
						onChange={(selected) =>
							selected && handleFieldChange('fontFamilyOption', selected)
						}
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => handleFieldChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						placeholder='Выберите цвет шрифта'
						onChange={(selected) =>
							selected && handleFieldChange('fontColor', selected)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						placeholder='Выберите цвет фона'
						onChange={(selected) =>
							selected && handleFieldChange('backgroundColor', selected)
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						placeholder='Выберите ширину контента'
						onChange={(selected) =>
							selected && handleFieldChange('contentWidth', selected)
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
