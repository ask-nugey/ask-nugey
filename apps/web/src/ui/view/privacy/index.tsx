import { css } from '@/lib/styled-system/css';
import { Container } from '@/src/ui/components/layout/Container';
import { PageHeader } from '@/src/ui/components/layout/PageHeader';

export const PagePrivacyView = () => {
	return (
		<>
			<PageHeader
				title="プライバシーポリシー"
				description="当サイトのプライバシーポリシーについて"
			/>

			<Container
				wrapperStyles={css.raw({
					mx: 'auto',
					py: '8',
				})}
				contentStyles={css.raw({
					display: 'grid',
					gap: 8,

					'& p': {
						mb: '4',
					},

					'& h2': {
						fontSize: '2xl',
						fontWeight: 'bold',
						mb: '4',
					},
				})}
			>
				<section>
					<p>
						Ask
						Nugey（以下「当サイト」といいます）では、お客様からお預かりする個人情報の重要性を強く認識し、個人情報の保護に関する法律およびその他関連法令を遵守するとともに、以下のプライバシーポリシーに従い、個人情報を安全かつ適切に取り扱うことを宣言いたします。
					</p>
				</section>

				<section>
					<h2>個人情報の定義</h2>
					<p>
						「個人情報」とは、個人情報保護法における「個人情報」を指し、生存する個人に関する情報で、氏名、生年月日、住所、電話番号、連絡先などにより特定の個人を識別できる情報を含みます。また、容貌、指紋、声紋などの生体情報や健康保険証の保険者番号など、単体で個人を識別可能な情報（個人識別情報）も含みます。
					</p>
				</section>

				<section>
					<h2>個人情報の管理</h2>
					<p>
						当サイトでは、お客様からお預かりした個人情報について、不正アクセス、紛失、漏えい等が発生しないよう、厳重かつ適切に管理いたします。
					</p>
				</section>

				<section>
					<h2>個人情報の利用目的</h2>
					<p>
						当サイトが収集した個人情報は、以下の目的のために利用し、目的外の利用は行いません。
					</p>
					<ol
						className={css({
							mb: '4',
							pl: '6',
							listStyle: 'decimal',
						})}
					>
						<li>ユーザーからのお問い合わせへの対応</li>
						<li>サービスの提供および運営の改善</li>
						<li>メンテナンスや重要なお知らせ等の必要なご連絡</li>
						<li>アクセス解析および利用状況の把握</li>
						<li>Google AdSenseによる広告配信</li>
						<li>上記に付随する目的</li>
					</ol>
				</section>

				<section>
					<h2>個人情報の第三者提供</h2>
					<p>
						当サイトは、法令に基づく場合を除き、ユーザーの同意を得ることなく、個人情報を第三者に提供することはありません。ただし、Google
						AdSenseによる広告配信のために、第三者（Googleを含む）がクッキーやウェブビーコンを使用して情報を収集する場合があります。
					</p>
				</section>

				<section>
					<h2>Cookieについて</h2>
					<p>
						Cookie（クッキー）とは、お客様のWeb閲覧履歴などをお客様のデバイスに保存する仕組みです。
					</p>
					<p>
						当サイトでは、第三者配信事業者である「Google
						AdSense」を利用しており、クッキーを用いてお客様の過去のアクセス情報に基づいた広告を表示する場合があります。
					</p>
					<p>
						お客様は、
						<a
							href="https://adssettings.google.com/authenticated"
							target="_blank"
							rel="noopener noreferrer"
							className={css({
								color: 'blue.600',
								textDecoration: 'underline',
							})}
						>
							Google広告設定
						</a>
						より、パーソナライズ広告の無効化が可能です。なお、Cookieからお客様個人を特定することはできません。
					</p>
				</section>

				<section>
					<h2>広告について</h2>
					<p>
						当サイトでは、Google
						AdSenseを利用した広告を掲載しております。Googleおよびそのパートナーは、ユーザーの過去の訪問履歴に基づいた広告を表示するためにクッキーを利用する場合があります。広告配信におけるクッキーの詳細や、無効化方法については、
						<a
							href="https://policies.google.com/technologies/ads?hl=ja"
							target="_blank"
							rel="noopener noreferrer"
							className={css({
								color: 'blue.600',
								textDecoration: 'underline',
							})}
						>
							Googleの広告ポリシー
						</a>
						をご覧ください。
					</p>
				</section>

				<section>
					<h2>著作権について</h2>
					<p>
						当サイトでは、情報の正確性を高める目的で書籍や他サイト等の公開情報を参考にすることがありますが、著作権侵害を意図するものではありません。使用している著作物の知的財産権は、それぞれの著作者・団体に帰属します。
					</p>
					<p>
						著作権や肖像権に関する問題がある場合はご連絡ください。著作権者様からの申し出により、速やかに修正または削除等の対応をいたします。
					</p>
				</section>

				<section>
					<h2>当サイトの著作権</h2>
					<p>
						当サイトに掲載されているコンテンツ（画像・写真・文章など）の著作権は、原則として当サイトに帰属し、無断転載を禁止します。
					</p>
					<p>
						コンテンツを利用したい場合は、事前にお問い合わせください。なお、引用や紹介を目的とする場合は、当サイト名および該当ページのURLを明記していただければ問題ありません。
					</p>
				</section>

				<section>
					<h2>リンクについて</h2>
					<p>
						当サイトはリンクフリーです。リンクを貼るにあたって、事前の許可やご連絡は不要です。
					</p>
				</section>

				<section>
					<h2>免責事項</h2>
					<p>
						当サイトからのリンクやバナー等で移動した外部サイトの内容やサービスについて、当サイトは一切の責任を負いません。
					</p>
					<p>
						当サイトのコンテンツについては、できる限り正確な情報を掲載するよう努めておりますが、その正確性や安全性を保証するものではありません。掲載された情報によって生じた損害等について、当サイトは一切の責任を負いかねますので、あらかじめご了承ください。
					</p>
				</section>

				<section>
					<h2>プライバシーポリシーの変更</h2>
					<p>
						当サイトは、法令の制定や改正等に伴い、本プライバシーポリシーを適宜見直し、予告なく変更する場合があります。変更後のプライバシーポリシーは、当サイトに掲載された時点、またはその他の方法により閲覧可能となった時点で効力を生じます。
					</p>
				</section>

				<section>
					<h2>お問い合わせ窓口</h2>
					<p>
						本ポリシーに関するご質問・ご相談は、下記のお問い合わせフォームよりご連絡ください。
					</p>
					<p>
						<a
							href="/contact"
							className={css({
								color: 'blue.600',
								textDecoration: 'underline',
							})}
						>
							お問い合わせ
						</a>
					</p>
				</section>
			</Container>
		</>
	);
};
