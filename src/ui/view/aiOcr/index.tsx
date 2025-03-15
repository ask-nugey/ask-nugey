'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { css } from '@/lib/styled-system/css';

export const PageAiOcrView = () => {
	const [file, setFile] = useState<File>();
	const [isDragging, setIsDragging] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrag = (e: DragEvent<HTMLDivElement>, dragging: boolean) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(dragging);
	};

	const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const newFile = e.dataTransfer.files[0];
			setFile(newFile);
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
		}
	};

	const previewURL = (() => {
		if (!file) return;
		return URL.createObjectURL(file);
	})();

	const FileUploader = () => (
		<div
			className={css({
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 4,
				marginTop: 0,
				border: '2px dashed',
				borderColor: isDragging ? 'teal.400' : 'gray.300',
				borderRadius: '2xl',
				backgroundColor: isDragging ? 'teal.50' : 'gray.50',
				cursor: 'pointer',
				transition: 'all 0.3s ease',
				boxShadow: isDragging ? 'md' : 'sm',
				_hover: {
					borderColor: !isDragging ? 'primary.300' : 'primary.400',
				},
			})}
			onClick={() => fileInputRef.current?.click()}
			onDragOver={e => handleDrag(e, true)}
			onDragLeave={e => handleDrag(e, false)}
			onDrop={handleDrop}
		>
			<input
				type="file"
				ref={fileInputRef}
				className={css({ display: 'none' })}
				onChange={handleFileChange}
				accept=".pdf,.jpg,.jpeg,.png"
			/>
			<div
				className={css({
					textAlign: 'center',
					width: '100%',
					maxWidth: '400px',
					padding: '1rem',
					'& > *': { marginBottom: '1.25rem' },
				})}
			>
				<h2
					className={css({
						fontSize: '2xl',
						fontWeight: 'bold',
						color: 'primary.400',
						marginBottom: '1rem',
					})}
				>
					{isDragging ? 'ここにドロップ！' : 'ファイルをアップロード'}
				</h2>

				<p
					className={css({
						color: 'gray.600',
						maxWidth: 'md',
						marginX: 'auto',
						lineHeight: '1.5',
						fontWeight: file ? 'bold' : 'normal',
					})}
				>
					{file ? (
						`選択済み: ${file.name}`
					) : (
						<>
							ファイルをドラッグ＆ドロップするか、
							<br />
							クリックして選択
						</>
					)}
					<span
						className={css({
							display: 'block',
							fontSize: 'sm',
							marginTop: 2,
							color: 'gray.500',
						})}
					>
						対応形式: PDF, JPEG, PNG
					</span>
				</p>

				<button
					type="button"
					className={css({
						marginTop: 3,
						display: 'inline-flex',
						alignItems: 'center',
						paddingX: '1.5rem',
						paddingY: '0.75rem',
						backgroundColor: 'primary.500',
						color: 'white',
						borderRadius: 'full',
						boxShadow: 'md',
						fontWeight: 'medium',
						transition: 'all 0.3s',
						cursor: 'pointer',
						_hover: {
							backgroundColor: 'primary.600',
							boxShadow: 'lg',
						},
					})}
					onClick={e => {
						e.stopPropagation();
						fileInputRef.current?.click();
					}}
				>
					ファイルを選択
				</button>
			</div>
		</div>
	);

	const FilePreview = () => (
		<div
			className={css({
				display: 'grid',
				border: '1px',
				borderColor: 'gray.200',
				borderRadius: 'lg',
			})}
		>
			<div
				className={css({
					position: 'sticky',
					top: 2,
					display: 'grid',
					gridTemplateRows: 'auto 1fr',
					gap: 4,
					height: '98dvh',
					overflowY: 'auto',
				})}
			>
				<p
					className={css({
						color: 'primary.500',
						fontSize: 'lg',
						fontWeight: 'bold',
					})}
				>
					ファイルプレビュー
				</p>

				{/* 画像 */}
				{getFileType(file) === 'image' && <img src={previewURL} alt="" />}

				{/* PDF */}
				{getFileType(file) === 'pdf' && (
					<iframe
						title="PDF"
						src={previewURL}
						className={css({
							width: 'full',
							height: 'full',
						})}
					/>
				)}
			</div>
		</div>
	);

	return (
		<div
			className={css({
				display: 'grid',
				gap: 4,
				marginBlock: 4,
				marginInline: 'auto',
				paddingInline: 2,
			})}
		>
			<div
				className={css({
					maxWidth: 1024,
				})}
			>
				<h1
					className={css({
						color: 'primary.500',
						fontSize: '2xl',
						fontWeight: 'bold',
					})}
				>
					AIでPDFをテキスト変換くん
				</h1>
				<p
					className={css({
						color: 'gray.600',
						fontWeight: 'bold',
					})}
				>
					PDFや画像をアップロードすると、いい感じにテキスト化してくれます（無料）
				</p>
			</div>

			{!previewURL && <FileUploader />}

			{previewURL && (
				<div
					className={css({
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 2,
					})}
				>
					<FilePreview />

					<p
						className={css({
							display: 'grid',
							justifyContent: 'center',
							alignItems: 'center',
							minHeight: '30vh',
						})}
					>
						　生成中...
					</p>
				</div>
			)}
		</div>
	);
};

const getFileType = (file?: File) => {
	if (!file) return;

	if (file.type === 'application/pdf') return 'pdf';

	const imageTypes = ['image/jpeg', 'image/jpeg', 'image/png'];
	if (imageTypes.includes(file.type)) return 'image';
};
