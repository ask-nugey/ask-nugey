export type ArticleNode = {
	theme: string;
	articles: string[];
	children: ArticleNode[];
};

export const themes: ArticleNode[] = [
	{
		theme: 'AI',
		articles: ['AI', 'AI-effect', 'g-jdla-syllabus-2024-11'],
		children: [
			{
				theme: 'AIとは',
				articles: [],
				children: [
					{ theme: 'AIの定義', articles: [], children: [] },
					{ theme: 'AIの歴史', articles: [], children: [] },
					{ theme: 'AIの用途', articles: [], children: [] },
					{ theme: 'AIの仕組み', articles: [], children: [] },
					{ theme: 'AIの分類', articles: [], children: [] },
					{ theme: 'AIと人間の役割分担', articles: [], children: [] },
					{ theme: 'AIとロボティクスの関係', articles: [], children: [] },
				],
			},
			{
				theme: 'AI技術の種類',
				articles: [],
				children: [
					{ theme: '機械学習（Machine Learning）', articles: [], children: [] },
					{
						theme: 'ディープラーニング（Deep Learning）',
						articles: [],
						children: [],
					},
					{ theme: '自然言語処理（NLP）', articles: [], children: [] },
					{ theme: 'コンピュータビジョン（CV）', articles: [], children: [] },
					{ theme: '音声認識', articles: [], children: [] },
					{ theme: '推論エンジン', articles: [], children: [] },
				],
			},
		],
	},
	{
		theme: 'AIアプリ開発',
		articles: [],
		children: [
			{
				theme: '基本的なアプリ',
				articles: [],
				children: [
					{ theme: 'AIチャットボットアプリ', articles: [], children: [] },
					{ theme: '文書要約AIアプリ', articles: [], children: [] },
					{ theme: '画像生成AIアプリ', articles: [], children: [] },
					{ theme: 'NLPを活用した対話型アプリ', articles: [], children: [] },
					{ theme: 'OpenAIやChatGPT APIの利用', articles: [], children: [] },
					{ theme: '画像認識アプリ', articles: [], children: [] },
					{
						theme: 'コンピュータビジョン技術を使ったアプリ',
						articles: [],
						children: [],
					},
					{ theme: '物体検出や顔認識機能の実装', articles: [], children: [] },
					{ theme: '音声認識アプリ', articles: [], children: [] },
					{ theme: '音声から文字起こし', articles: [], children: [] },
					{ theme: '音声コマンドの認識', articles: [], children: [] },
					{ theme: '推奨システムアプリ', articles: [], children: [] },
					{
						theme: 'レコメンデーションエンジンの構築',
						articles: [],
						children: [],
					},
					{
						theme: 'ユーザーデータに基づくパーソナライズ',
						articles: [],
						children: [],
					},
				],
			},
			{
				theme: 'ビジネス課題解決(ソリューション)別',
				articles: [],
				children: [
					{
						theme: 'パーソナライズされたレコメンデーションシステム',
						articles: [],
						children: [],
					},
					{
						theme: '顧客サポート自動化ソリューション',
						articles: [],
						children: [],
					},
					{ theme: '需要予測と在庫最適化システム', articles: [], children: [] },
					{ theme: '不正検知と防止システム', articles: [], children: [] },
					{
						theme: 'ビジネスインテリジェンスと意思決定支援ツール',
						articles: [],
						children: [],
					},
				],
			},
			{
				theme: '機能別',
				articles: [],
				children: [
					{
						theme: '自然言語処理（NLP）アプリケーション',
						articles: [],
						children: [],
					},
					{
						theme: 'コンピュータビジョンアプリケーション',
						articles: [],
						children: [],
					},
					{
						theme: '音声認識・合成アプリケーション',
						articles: [],
						children: [],
					},
					{ theme: '予測分析アプリケーション', articles: [], children: [] },
					{ theme: '強化学習アプリケーション', articles: [], children: [] },
				],
			},
			{
				theme: 'AIアプリ開発の手法',
				articles: [],
				children: [
					{ theme: 'モデルベースの開発', articles: [], children: [] },
					{ theme: 'モデルの選定方法', articles: [], children: [] },
					{ theme: 'トレーニングと評価', articles: [], children: [] },
					{ theme: 'データ駆動型開発', articles: [], children: [] },
					{ theme: 'データ収集と準備', articles: [], children: [] },
					{ theme: '特徴量エンジニアリング', articles: [], children: [] },
					{ theme: 'データアノテーション', articles: [], children: [] },
					{ theme: 'クラウドベースの開発', articles: [], children: [] },
					{
						theme: 'AIプラットフォームの利用（AWS、GCP、Azure）',
						articles: [],
						children: [],
					},
					{ theme: 'APIを利用したAI機能の実装', articles: [], children: [] },
				],
			},
			{
				theme: 'AI開発のツール',
				articles: [],
				children: [
					{ theme: '開発フレームワーク', articles: [], children: [] },
					{ theme: 'TensorFlow', articles: [], children: [] },
					{ theme: 'PyTorch', articles: [], children: [] },
					{ theme: 'scikit-learn', articles: [], children: [] },
					{ theme: 'モデルの管理ツール', articles: [], children: [] },
					{ theme: 'MLflow', articles: [], children: [] },
					{ theme: 'DVC（Data Version Control）', articles: [], children: [] },
					{ theme: 'データセット管理ツール', articles: [], children: [] },
					{ theme: 'Kaggle', articles: [], children: [] },
					{ theme: 'Google Dataset Search', articles: [], children: [] },
					{ theme: 'モニタリングツール', articles: [], children: [] },
					{ theme: 'Weights & Biases', articles: [], children: [] },
					{ theme: 'Neptune.ai', articles: [], children: [] },
				],
			},
			{
				theme: '開発プロセス',
				articles: [],
				children: [
					{ theme: '要件定義とプロジェクト計画', articles: [], children: [] },
					{ theme: 'データ収集と前処理', articles: [], children: [] },
					{ theme: 'モデル選択と学習', articles: [], children: [] },
					{ theme: 'アプリケーション設計と実装', articles: [], children: [] },
					{ theme: 'テストと評価', articles: [], children: [] },
					{ theme: 'デプロイメントと運用保守', articles: [], children: [] },
				],
			},
			{ theme: '生成AIと著作権', articles: [], children: [] },
			{
				theme: '最新のAI技術トレンド',
				articles: [],
				children: [
					{ theme: 'エッジAI', articles: [], children: [] },
					{ theme: '説明可能AI (XAI)', articles: [], children: [] },
					{ theme: 'フェデレーテッドラーニング', articles: [], children: [] },
					{ theme: '量子機械学習', articles: [], children: [] },
				],
			},
			{
				theme: 'AIアプリのデプロイ',
				articles: [],
				children: [
					{
						theme: 'サーバーレスアーキテクチャでのデプロイ',
						articles: [],
						children: [],
					},
					{
						theme: 'コンテナ化技術を利用したデプロイ（Docker, Kubernetes）',
						articles: [],
						children: [],
					},
					{
						theme: 'モバイルアプリへの組み込み（iOS、Android）',
						articles: [],
						children: [],
					},
					{
						theme: 'エッジデバイスでのAIデプロイ（Raspberry Pi、Jetson）',
						articles: [],
						children: [],
					},
				],
			},
			{
				theme: 'AIとクラウドサービス',
				articles: [],
				children: [
					{ theme: 'AWS AI サービス', articles: [], children: [] },
					{ theme: 'Google Cloud AI', articles: [], children: [] },
					{ theme: 'Azure Cognitive Services', articles: [], children: [] },
					{ theme: 'IBM Watson', articles: [], children: [] },
					{ theme: 'クラウドベースのAI開発環境', articles: [], children: [] },
				],
			},
			{
				theme: '学習リソース・参考資料',
				articles: [],
				children: [
					{
						theme: 'AI開発のためのオンラインコース',
						articles: [],
						children: [],
					},
					{ theme: 'Coursera', articles: [], children: [] },
					{ theme: 'Udacity', articles: [], children: [] },
					{ theme: 'edX', articles: [], children: [] },
					{ theme: 'ブログ・技術記事', articles: [], children: [] },
					{ theme: '書籍', articles: [], children: [] },
					{ theme: 'AIコミュニティへの参加', articles: [], children: [] },
				],
			},
		],
	},
	{
		theme: 'ChatGPT',
		articles: [],
		children: [
			{
				theme: 'ChatGPT API',
				articles: [],
				children: [
					{ theme: 'APIの基本概念と使用方法', articles: [], children: [] },
					{
						theme: 'プロンプトエンジニアリング技術',
						articles: [],
						children: [],
					},
					{
						theme: 'レスポンス処理とエラーハンドリング',
						articles: [],
						children: [],
					},
					{ theme: '高度なAPI活用テクニック', articles: [], children: [] },
				],
			},
			{
				theme: 'ChatGPT APIでのサービス開発',
				articles: [],
				children: [
					{ theme: 'チャットボット開発入門', articles: [], children: [] },
				],
			},
			{
				theme: 'GPTモデルの理解',
				articles: [],
				children: [
					{ theme: 'GPTアーキテクチャの基礎', articles: [], children: [] },
					{ theme: 'トークン化とエンコーディング', articles: [], children: [] },
					{
						theme: 'ファインチューニングの理論と実践',
						articles: [],
						children: [],
					},
					{ theme: 'GPTモデルの限界と課題', articles: [], children: [] },
				],
			},
			{
				theme: 'ChatGPTの活用事例',
				articles: [],
				children: [
					{ theme: '教育・学習支援システム', articles: [], children: [] },
					{ theme: 'カスタマーサービス向上', articles: [], children: [] },
					{ theme: 'コンテンツ創作と編集支援', articles: [], children: [] },
					{ theme: 'ビジネス分析とレポート作成', articles: [], children: [] },
					{ theme: '医療・ヘルスケア支援', articles: [], children: [] },
				],
			},
			{ theme: 'プロンプトエンジニアリング', articles: [], children: [] },
			{ theme: 'ChatGPTと他のAIモデルの比較', articles: [], children: [] },
		],
	},
	{
		theme: 'Python',
		articles: [
			'python-what-is',
			'pyenv-version-management',
			'python-version-env-tools',
		],
		children: [
			{
				theme: 'Python入門',
				articles: [],
				children: [
					{ theme: '基本文法', articles: [], children: [] },
					{ theme: '制御構造とループ', articles: [], children: [] },
					{ theme: '関数とモジュール', articles: [], children: [] },
					{
						theme: 'オブジェクト指向プログラミング',
						articles: [],
						children: [],
					},
					{ theme: '例外処理とデバッグ', articles: [], children: [] },
				],
			},
			{
				theme: 'Python環境構築',
				articles: [
					// 'beginner-python-setup',
					// 'easy-python-env-setup',
					// 'pro-python-standards',
					// 'python-tools-resources',
					// 'quick-python-setup',
					//
					// {
					// 	title: '初心者のためのPython環境構築ガイド',
					// 	slug: 'beginner-python-setup',
					// },
					// {
					// 	title: '簡単！Python開発環境の作り方',
					// 	slug: 'easy-python-env-setup',
					// },
					// {
					// 	title: 'プロが教えるPython環境構築のベストプラクティス',
					// 	slug: 'pro-python-standards',
					// },
					// {
					// 	title: 'Python開発に必要なツールとリソース',
					// 	slug: 'python-tools-resources',
					// },
					// {
					// 	title: '初心者向け：手早くできるPythonセットアップ',
					// 	slug: 'quick-python-setup',
					// },
				],
				children: [
					{
						theme: '開発環境のセットアップ',
						articles: [
							// 'ide-selection-install',
							// 'optimal-python-env',
							// 'efficient-env-setup',
							// 'python-integration-env',
							// 'docker-setup-for-python',
							//
							// {
							// 	title: 'IDEの選択とインストール方法',
							// 	slug: 'ide-selection-install',
							// },
							// {
							// 	title: '最適なPython開発環境の構築',
							// 	slug: 'optimal-python-env',
							// },
							// {
							// 	title: '効率的な開発環境設定のコツ',
							// 	slug: 'efficient-env-setup',
							// },
							// {
							// 	title: 'Pythonと他の言語の統合環境構築',
							// 	slug: 'python-integration-env',
							// },
							// {
							// 	title: 'PythonのためのDocker環境構築',
							// 	slug: 'docker-setup-for-python',
							// },
						],
						children: [],
					},
					{
						theme: 'Pythonのバージョン管理',
						articles: [
							// 'pyenv-version-management',
							// 'python-version-env-tools',
							// 'easy-python-switching',
							// 'multiple-python-versions',
							// 'project-specific-python',
							// 'python-version-troubleshoot',
							//
							// {
							// 	title: 'pyenvを用いたPythonバージョン管理',
							// 	slug: 'pyenv-version-management',
							// },
							// {
							// 	title: 'Pythonのバージョン管理と仮想環境管理ツール一覧',
							// 	slug: 'python-version-env-tools',
							// },
							// {
							// 	title: 'Pythonのバージョンを簡単に切り替える方法',
							// 	slug: 'easy-python-switching',
							// },
							// {
							// 	title: '複数バージョンのPythonを共存させる',
							// 	slug: 'multiple-python-versions',
							// },
							// {
							// 	title: 'プロジェクト別のPythonバージョン管理',
							// 	slug: 'project-specific-python',
							// },
							// {
							// 	title: 'Pythonバージョン管理のトラブルシューティング',
							// 	slug: 'python-version-troubleshoot',
							// },
						],
						children: [],
					},
					{
						theme: 'パッケージ管理とvirtual環境',
						articles: [
							// 'pip-vs-pipenv',
							// 'virtualenv-isolation',
							// 'conda-package-management',
							// 'resolving-package-dependencies',
							// 'choosing-package-manager',
							//
							// {
							//   title: 'pipとpipenvの違いを理解する',
							//   slug: 'pip-vs-pipenv'
							// },
							// {
							// 	title: 'virtualenvを活用した環境の分離',
							// 	slug: 'virtualenv-isolation',
							// },
							// {
							// 	title: 'condaによるパッケージ管理の方法',
							// 	slug: 'conda-package-management',
							// },
							// {
							// 	title: 'パッケージ依存関係を解決する',
							// 	slug: 'resolving-package-dependencies',
							// },
							// {
							// 	title: 'パッケージ管理ツールの選び方',
							// 	slug: 'choosing-package-manager',
							// },
						],
						children: [],
					},
					{
						theme: 'IDE・エディタの選択と設定',
						articles: [
							// 'beginners-python-editor',
							// 'vscode-python-customization',
							// 'pycharm-basic-setup',
							// 'fast-python-editing-setup',
							// 'vim-optimization-python',
							//
							// {
							// 	title: '初心者向けおすすめPythonエディタ',
							// 	slug: 'beginners-python-editor',
							// },
							// {
							// 	title: 'VSCodeをPython開発用にカスタマイズ',
							// 	slug: 'vscode-python-customization',
							// },
							// {
							//   title: 'PyCharmの基本設定手順',
							//   slug: 'pycharm-basic-setup'
							// },
							// {
							// 	title: '最速Python編集環境の構築',
							// 	slug: 'fast-python-editing-setup',
							// },
							// {
							// 	title: 'VimをPython開発に最適化する',
							// 	slug: 'vim-optimization-python',
							// },
						],
						children: [],
					},
					{
						theme: 'コーディング規約とスタイルガイド',
						articles: [
							// 'pep8-coding-standard',
							// 'basics-of-style-guide',
							// 'standards-for-code-review',
							// 'best-practices-python-coding',
							// 'implement-project-coding-guide',
							//
							// {
							// 	title: 'PEP8で統一されたコードを書こう',
							// 	slug: 'pep8-coding-standard',
							// },
							// {
							// 	title: 'Pythonスタイルガイドの基礎知識',
							// 	slug: 'basics-of-style-guide',
							// },
							// {
							// 	title: '効率的にコードレビューするための規約',
							// 	slug: 'standards-for-code-review',
							// },
							// {
							// 	title: 'Pythonのコーディングベストプラクティス',
							// 	slug: 'best-practices-python-coding',
							// },
							// {
							// 	title: 'プロジェクトに合ったコード規約の導入',
							// 	slug: 'implement-project-coding-guide',
							// },
						],
						children: [],
					},
					{
						theme: 'リンターとフォーマッター',
						articles: [
							// 'python-formatting-tools',
							// 'linting-for-code-quality',
							// 'black-flake8-formatting',
							// 'choosing-linter-formatter',
							// 'ci-cd-formatting-automation',
							//
							// {
							// 	title: 'Pythonコードを整える自動ツール',
							// 	slug: 'python-formatting-tools',
							// },
							// {
							// 	title: 'コードの品質を保つためのリンティング',
							// 	slug: 'linting-for-code-quality',
							// },
							// {
							// 	title: 'BlackとFlake8によるコード整形',
							// 	slug: 'black-flake8-formatting',
							// },
							// {
							// 	title: '自分に合ったリンターとフォーマッターの選択',
							// 	slug: 'choosing-linter-formatter',
							// },
							// {
							// 	title: 'CI/CDパイプラインでのフォーマット自動化',
							// 	slug: 'ci-cd-formatting-automation',
							// },
						],
						children: [],
					},
					{
						theme: '型チェッカー',
						articles: [
							// 'mypy-static-type-checking',
							// 'using-type-annotations',
							// 'pros-cons-type-use',
							// 'pylint-enhance-type-check',
							// 'future-proof-type-management',
							//
							// {
							// 	title: 'Mypyを用いた静的型チェック',
							// 	slug: 'mypy-static-type-checking',
							// },
							// {
							// 	title: 'Pythonでの型アノテーション活用法',
							// 	slug: 'using-type-annotations',
							// },
							// {
							// 	title: '型を導入するメリットとデメリット',
							// 	slug: 'pros-cons-type-use',
							// },
							// {
							// 	title: 'Pylintで型チェックを強化する',
							// 	slug: 'pylint-enhance-type-check',
							// },
							// {
							// 	title: '将来に備えたPythonコードの型管理',
							// 	slug: 'future-proof-type-management',
							// },
						],
						children: [],
					},
				],
			},
			{
				theme: 'Pythonでのデータ処理',
				articles: [],
				children: [
					{ theme: 'Pandasによるデータ操作', articles: [], children: [] },
					{ theme: 'NumPyを用いた数値計算', articles: [], children: [] },
					{
						theme: 'データ可視化（Matplotlib, Seaborn）',
						articles: [],
						children: [],
					},
					{ theme: 'データクレンジングと前処理', articles: [], children: [] },
					{ theme: '大規模データ処理技術', articles: [], children: [] },
				],
			},
			{
				theme: 'Python応用',
				articles: [],
				children: [
					{
						theme: '並行処理と非同期プログラミング',
						articles: [],
						children: [],
					},
					{
						theme: 'データベース連携（SQLAlchemy）',
						articles: [],
						children: [],
					},
					{
						theme: 'ユニットテストとテスト駆動開発',
						articles: [],
						children: [],
					},
					{
						theme: 'パフォーマンス最適化テクニック',
						articles: [],
						children: [],
					},
					{
						theme: 'Pythonによるデータサイエンスワークフロー',
						articles: [],
						children: [],
					},
				],
			},
			{ theme: 'Pythonによる自動化', articles: [], children: [] },
			{ theme: 'Pythonのパフォーマンス最適化', articles: [], children: [] },
		],
	},
	{
		theme: '機械学習',
		articles: [],
		children: [
			{
				theme: '機械学習基礎',
				articles: [],
				children: [
					{ theme: '教師あり学習', articles: [], children: [] },
					{ theme: '教師なし学習', articles: [], children: [] },
					{ theme: '強化学習', articles: [], children: [] },
					{ theme: 'モデル評価と選択', articles: [], children: [] },
					{ theme: '特徴量エンジニアリング', articles: [], children: [] },
				],
			},
			{ theme: 'データ可視化', articles: [], children: [] },
			{
				theme: 'データ処理',
				articles: [],
				children: [
					{ theme: 'Pandasによるデータ操作', articles: [], children: [] },
					{ theme: 'NumPyを用いた数値計算', articles: [], children: [] },
					{ theme: 'データ可視化（Matplotlib', articles: [], children: [] },
					{ theme: 'データクレンジングと前処理', articles: [], children: [] },
					{ theme: '大規模データ処理技術', articles: [], children: [] },
				],
			},
			{
				theme: 'ディープラーニング',
				articles: [],
				children: [
					{ theme: 'ニューラルネットワークの基礎', articles: [], children: [] },
					{ theme: 'CNNとコンピュータビジョン', articles: [], children: [] },
					{ theme: 'RNNと自然言語処理', articles: [], children: [] },
					{ theme: 'GANと生成モデル', articles: [], children: [] },
					{
						theme: '転移学習とファインチューニング',
						articles: [],
						children: [],
					},
				],
			},
			{
				theme: 'AIフレームワークとツール',
				articles: [],
				children: [
					{ theme: 'TensorFlow', articles: [], children: [] },
					{ theme: 'PyTorch', articles: [], children: [] },
					{ theme: 'Scikit', articles: [], children: [] },
					{ theme: 'Keras', articles: [], children: [] },
					{ theme: 'OpenCV', articles: [], children: [] },
				],
			},
			{
				theme: 'データサイエンス',
				articles: [],
				children: [
					{ theme: 'データ収集と前処理', articles: [], children: [] },
					{ theme: '探索的データ分析', articles: [], children: [] },
					{ theme: '統計学の基礎', articles: [], children: [] },
					{ theme: 'ビッグデータ処理', articles: [], children: [] },
					{ theme: 'データマイニング技術', articles: [], children: [] },
				],
			},
		],
	},
	{
		theme: 'js',
		articles: ['javascript-runtime'],
		children: [
			{
				theme: 'react',
				articles: ['react-dev-blog-2024-02-15'],
				children: [],
			},
			{
				theme: 'NestJS',
				articles: ['learn-nestjs-with-moon-demo'],
				children: [],
			},
		],
	},
	{ theme: 'Azure', articles: ['azure-devops'], children: [] },
	{ theme: 'golang', articles: ['go-api-sql'], children: [] },
	{ theme: 'rust', articles: ['rust-build-environment'], children: [] },
	{ theme: 'html-css', articles: ['css-grid'], children: [] },
	{ theme: 'モノレポ', articles: ['moonrepo-learn-demo'], children: [] },
	{
		theme: 'mac',
		articles: ['app-mac', 'mac-emulator-for-windows'],
		children: [],
	},
	{
		theme: 'nugey',
		articles: ['nugey-personality', 'tech-stack-my-site', 'todo'],
		children: [],
	},
];
