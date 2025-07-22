'use client';

import { OCRPageObject } from '@mistralai/mistralai/models/components';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { css } from '@/lib/styled-system/css';
import { getOcrPages } from '@/src/app/_actions/ai-ocr/ocr';
import { getFileType } from '@/src/ui/view/aiOcr/_index/utils';

export const PageAiOcrView = () => {
	const [file, setFile] = useState<File>();
	const [pages, setPages] = useState<OCRPageObject[]>();
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

			await processFileOcr(newFile);
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			processFileOcr(selectedFile);
		}
	};

	const processFileOcr = async (selectedFile: File) => {
		const fileToUpload = selectedFile;

		const formData = new FormData();
		formData.append('file', fileToUpload);

		const result = await getOcrPages(formData);

		setPages(result?.ocrPages);
	};

	// すべてのページのマークダウンを結合してコピーする関数
	const copyAllMarkdown = () => {
		if (!pages) return;

		const allMarkdown = pages
			.map(page => {
				const pageTitle = `# Page ${page.index + 1}\n\n`;
				return pageTitle + (page.markdown || '（テキストなし）');
			})
			.join('\n\n---\n\n');

		copyToClipboard(allMarkdown);
	};

	// クリップボードにコピーする関数
	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
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
				<div
					className={css({
						display: 'flex',
						alignItems: 'center',
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
					<button
						onClick={copyAllMarkdown}
						className={css({
							display: 'inline-flex',
							alignItems: 'center',
							marginLeft: 'auto',
							paddingX: 2,
							paddingY: 2,
							color: 'white',
							fontSize: 'sm',
							fontWeight: 'bold',
							transition: 'all 0.3s',
							backgroundColor: 'primary.500',
							borderRadius: 'md',
							cursor: 'pointer',
							_hover: {
								backgroundColor: 'primary.600',
							},
						})}
					>
						テキストをコピーする→
					</button>
				</div>

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

	const OcrPages = () => {
		if (!pages) return;
		return (
			<div
				className={css({
					display: 'grid',
					border: '1px solid',
					borderColor: 'gray.300',
					borderRadius: 'lg',
				})}
			>
				{pages.map(
					(page: OCRPageObject, index: number) =>
						page.markdown && (
							<div
								key={index}
								className={css({
									maxWidth: 'full',
									bg: 'white',
									rounded: 'lg',
									shadow: 'md',
									p: 6,
								})}
							>
								<ReactMarkdown
									remarkPlugins={[remarkMath, remarkGfm]}
									rehypePlugins={[rehypeKatex]}
									components={{
										p: ({ children }) => (
											<p
												className={css({
													my: 3,
													lineHeight: 'relaxed',
													color: 'gray.700',
													whiteSpace: 'pre-line',
												})}
											>
												{children}
											</p>
										),
										h1: ({ children }) => (
											<h1
												className={css({
													fontSize: '3xl',
													fontWeight: 'bold',
													mt: 6,
													mb: 3,
													pb: 2,
													borderBottomWidth: '1px',
													borderColor: 'primary.200',
													color: 'primary.700',
												})}
											>
												{children}
											</h1>
										),
										h2: ({ children }) => (
											<h2
												className={css({
													fontSize: '2xl',
													fontWeight: 'bold',
													mt: 5,
													mb: 3,
													color: 'primary.600',
												})}
											>
												{children}
											</h2>
										),
										h3: ({ children }) => (
											<h3
												className={css({
													fontSize: 'xl',
													fontWeight: 'bold',
													mt: 4,
													mb: 2,
													color: 'primary.500',
												})}
											>
												{children}
											</h3>
										),
										ul: ({ children }) => (
											<ul
												className={css({
													my: 3,
													pl: 8,
													listStyleType: 'disc',
													color: 'gray.700',
												})}
											>
												{children}
											</ul>
										),
										ol: ({ children }) => (
											<ol
												className={css({
													my: 3,
													pl: 8,
													listStyleType: 'decimal',
													color: 'gray.700',
												})}
											>
												{children}
											</ol>
										),
										li: ({ children }) => (
											<li
												className={css({
													my: 2,
													lineHeight: 'relaxed',
												})}
											>
												{children}
											</li>
										),
										br: () => <br />,
										table: ({ children }) => (
											<div
												className={css({
													overflowX: 'auto',
													my: 5,
													rounded: 'md',
													shadow: 'sm',
												})}
											>
												<table
													className={css({
														width: 'full',
														borderCollapse: 'separate',
														borderSpacing: 0,
														borderWidth: '1px',
														borderColor: 'gray.200',
														rounded: 'md',
														overflow: 'hidden',
													})}
												>
													{children}
												</table>
											</div>
										),
										thead: ({ children }) => (
											<thead
												className={css({
													bg: 'gray.50',
													borderBottomWidth: '1px',
													borderColor: 'gray.200',
												})}
											>
												{children}
											</thead>
										),
										tbody: ({ children }) => (
											<tbody
												className={css({
													bg: 'white',
													divideColor: 'gray.200',
												})}
											>
												{children}
											</tbody>
										),
										tr: ({ children }) => (
											<tr
												className={css({
													_hover: { bg: 'gray.50' },
													transition: 'all 0.2s',
												})}
											>
												{children}
											</tr>
										),
										th: ({ children }) => (
											<th
												className={css({
													px: 4,
													py: 3,
													textAlign: 'left',
													fontSize: 'xs',
													fontWeight: 'semibold',
													textTransform: 'uppercase',
													letterSpacing: 'wider',
													color: 'gray.700',
													borderRightWidth: '1px',
													borderColor: 'gray.200',
													_last: { borderRightWidth: 0 },
												})}
											>
												{children}
											</th>
										),
										td: ({ children }) => (
											<td
												className={css({
													px: 4,
													py: 3,
													fontSize: 'sm',
													color: 'gray.700',
													borderRightWidth: '1px',
													borderColor: 'gray.200',
													_last: { borderRightWidth: 0 },
													whiteSpace: 'pre-wrap',
												})}
											>
												{children}
											</td>
										),
										blockquote: ({ children }) => (
											<blockquote
												className={css({
													borderLeftWidth: '4px',
													borderColor: 'primary.200',
													pl: 5,
													py: 2,
													my: 3,
													color: 'gray.600',
													fontStyle: 'italic',
													bg: 'gray.50',
													rounded: 'sm',
													pr: 4,
												})}
											>
												{children}
											</blockquote>
										),
										code: ({ children, className }) => {
											const match = /language-(\w+)/.exec(className || '');
											return (
												<div
													className={css({
														my: 3,
														overflow: 'auto',
														rounded: 'md',
														bg: match ? 'gray.900' : 'gray.100',
														shadow: 'sm',
													})}
												>
													<pre
														className={css({
															color: match ? 'gray.100' : 'gray.800',
															p: 4,
															fontSize: 'sm',
															overflow: 'auto',
															fontFamily: 'mono',
														})}
													>
														<code className={className}>{children}</code>
													</pre>
												</div>
											);
										},
										img: ({ src, alt }) => {
											// マークダウン内の画像参照とページの画像データを照合
											const fileName = src?.toString().split('/').pop() || '';
											// 現在のページから一致する画像IDを持つ画像を探す
											const matchedImage = page.images?.find(
												img => img.id === fileName,
											);

											if (matchedImage?.imageBase64) {
												// base64データの形式を取得
												const base64Src = getImageFormat(
													matchedImage.imageBase64,
												);
												return (
													<img
														src={base64Src}
														alt={alt}
														className={css({
															maxWidth: 'full',
															height: 'auto',
															rounded: 'md',
															shadow: 'md',
															my: 4,
															mx: 'auto',
															display: 'block',
															transition: 'transform 0.3s ease',
															_hover: {
																transform: 'scale(1.01)',
																shadow: 'lg',
															},
														})}
													/>
												);
											}

											// 画像が見つからない場合は元のsrcを使用
											return (
												<img
													src={src}
													alt={alt}
													className={css({
														maxWidth: 'full',
														height: 'auto',
														rounded: 'md',
														shadow: 'md',
														my: 4,
														mx: 'auto',
														display: 'block',
														transition: 'transform 0.3s ease',
														_hover: {
															transform: 'scale(1.01)',
															shadow: 'lg',
														},
													})}
												/>
											);
										},
									}}
								>
									{page.markdown}
								</ReactMarkdown>
							</div>
						),
				)}
			</div>
		);
	};

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
					<br />
					<span
						className={css({
							fontWeight: 'normal',
						})}
					>
						※機密情報や個人情報が入ったものはアップロードしないようご注意ください❗️
					</span>
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

					{pages ? (
						<OcrPages />
					) : (
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
					)}
				</div>
			)}
		</div>
	);
};

const getImageFormat = (base64String: string) => {
	try {
		// base64データが先頭に「data:image/...;base64,」形式を含む場合は処理
		if (base64String.startsWith('data:image/')) {
			return base64String;
		}

		// 先頭バイトからMIMEタイプを判定
		const byte = atob(base64String.substring(0, 4));

		// 一般的な画像形式のシグネチャ
		if (byte.startsWith('\xFF\xD8\xFF'))
			return `data:image/jpeg;base64,${base64String}`;
		if (byte.startsWith('\x89PNG'))
			return `data:image/png;base64,${base64String}`;
		if (byte.startsWith('GIF8')) return `data:image/gif;base64,${base64String}`;
		if (byte.startsWith('RIFF'))
			return `data:image/webp;base64,${base64String}`;

		// 判別できない場合はpngとして扱う
		return `data:image/png;base64,${base64String}`;
	} catch (e) {
		console.error('Failed to get image format:', e);
		// エラーが発生した場合はpngとして扱う
		return `data:image/png;base64,${base64String}`;
	}
};
