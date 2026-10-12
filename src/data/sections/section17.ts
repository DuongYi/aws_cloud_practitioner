import { SectionItem } from '../../types';

export const section17Data: SectionItem = {
  id: 'section-17',
  sectionNumber: 17,
  titleEn: 'Machine Learning & AI Services (Rekognition, Transcribe, Polly, Translate, Lex, Connect, Comprehend, SageMaker, Kendra, Personalize, Textract)',
  titleVi: 'Trí tuệ Nhân tạo & Machine Learning (Rekognition, Transcribe, Polly, Translate, Lex, Connect, Comprehend, SageMaker, Kendra, Personalize, Textract)',
  domain: 'Domain 3: Cloud Technology and Services',
  weightPercentage: '34%',
  badge: 'AI & ML Core (Domain 3)',
  overviewEn: 'Section 17 covers AWS Artificial Intelligence (AI) and Machine Learning (ML) services. In the AWS Certified Cloud Practitioner CLF-C02 exam, questions on Machine Learning test your ability to match business problems to the right managed AI service using the golden rule: "1 Service = 1 Primary Definition / Keyword". You will master: Amazon Rekognition (computer vision, object/face detection, moderation), Amazon Transcribe (speech-to-text ASR, PII redaction), Amazon Polly (text-to-speech TTS, lifelike neural voices), Amazon Translate (fluent language translation), Amazon Lex (conversational chatbots powered by Alexa technology), Amazon Connect (cloud-native omnichannel contact center), Amazon Comprehend (Natural Language Processing NLP, sentiment analysis), Amazon SageMaker (complete platform for developers and data scientists to build, train, tune, and deploy custom ML models), Amazon Kendra (ML-powered enterprise intelligent document search), Amazon Personalize (real-time personalized recommendations), Amazon Textract (extract text, tables, and forms from scanned documents), and a comprehensive Machine Learning Cheat Sheet with common multi-service architectures.',
  overviewVi: 'Section 17 bao quát toàn diện các dịch vụ Trí tuệ Nhân tạo (AI) và Học máy (Machine Learning) cốt lõi trên AWS thuộc Domain 3 của đề thi AWS Certified Cloud Practitioner CLF-C02. Nguyên tắc vàng để đạt điểm tuyệt đối ở phần này là "1 Dịch vụ = 1 Định nghĩa / Từ khóa trúng đích": Amazon Rekognition (thị giác máy tính, nhận diện người, đồ vật, khuôn mặt, kiểm duyệt ảnh/video nhạy cảm), Amazon Transcribe (chuyển đổi giọng nói thành văn bản ASR, tự động làm mờ thông tin cá nhân PII), Amazon Polly (chuyển văn bản thành giọng nói TTS tự nhiên), Amazon Translate (dịch thuật ngôn ngữ tự nhiên), Amazon Lex (xây dựng chatbot đàm thoại bằng giọng nói/văn bản với công nghệ của trợ lý ảo Alexa), Amazon Connect (tổng đài ảo chăm sóc khách hàng trên đám mây), Amazon Comprehend (xử lý ngôn ngữ tự nhiên NLP, phân tích cảm xúc, trích xuất thực thể), Amazon SageMaker (nền tảng đầy đủ cho Data Scientist & Developer tự xây dựng, huấn luyện và triển khai mô hình ML tùy chỉnh), Amazon Kendra (công cụ tìm kiếm tài liệu thông minh trong doanh nghiệp bằng ngôn ngữ tự nhiên), Amazon Personalize (gợi ý sản phẩm và nội dung cá nhân hóa thời gian thực), Amazon Textract (đọc chữ, bảng biểu, cặp key-value từ tài liệu quét scan/PDF), cùng Bảng Ma trận Cheat Sheet và các mô hình kết hợp dịch vụ kinh điển trong phòng thi.',
  quickExamFacts: [
    {
      en: 'Rekognition vs Textract: Rekognition is for computer vision (images/video, faces, objects, celebrities, unsafe moderation). Textract is for documents (extracts text, handwriting, forms with key-values, and tables from scanned PDFs/images).',
      vi: 'Rekognition so với Textract: Rekognition dùng cho thị giác máy tính (phân tích ảnh/video, khuôn mặt, đồ vật, người nổi tiếng, kiểm duyệt nội dung phản cảm). Textract dùng cho tài liệu quét (đọc chữ viết tay, trích xuất biểu mẫu key-value, và bảng biểu từ file PDF/ảnh scan).',
      isCoreHighlight: true
    },
    {
      en: 'Transcribe vs Polly vs Translate: Transcribe = Speech to Text (audio into text transcripts, PII redaction). Polly = Text to Speech (reads text aloud into lifelike audio). Translate = Language Translation (English to Vietnamese, Spanish, etc.).',
      vi: 'Bộ ba Âm thanh & Dịch thuật: Transcribe = Giọng nói thành văn bản (chuyển file ghi âm thành chữ, làm mờ PII). Polly = Văn bản thành giọng nói (đọc văn bản thành file âm thanh tự nhiên). Translate = Dịch thuật đa ngôn ngữ tự nhiên.',
      isCoreHighlight: true
    },
    {
      en: 'Lex vs Connect: Lex is a conversational chatbot engine (Alexa technology, ASR + NLU, voice/text bots). Connect is a cloud contact center (virtual customer service call center, IVR, phone routing). Lex is often used inside Connect to power phone bots.',
      vi: 'Lex so với Connect: Lex là dịch vụ tạo Chatbot đàm thoại (công nghệ của Alexa, nhận diện ý định bằng ASR và NLU). Connect là tổng đài chăm sóc khách hàng trên đám mây (Cloud Contact Center, nhận cuộc gọi, phân luồng tổng đài viên). Thường tích hợp Lex vào Connect để làm tổng đài trả lời tự động.',
      isCoreHighlight: true
    },
    {
      en: 'Comprehend: Natural Language Processing (NLP) service that finds insights and relationships in text. Uses: Sentiment Analysis (positive, negative, neutral), entity recognition, language detection, key phrases, and topic modeling.',
      vi: 'Comprehend: Dịch vụ Xử lý Ngôn ngữ Tự nhiên (NLP) phân tích văn bản để tìm ý nghĩa và mối liên hệ. Từ khóa đề thi: Phân tích cảm xúc (Sentiment Analysis - khen hay chê), nhận diện thực thể (Entity Recognition), nhận diện ngôn ngữ, trích xuất cụm từ khóa chính.',
      isCoreHighlight: true
    },
    {
      en: 'SageMaker vs Pre-trained AI APIs: SageMaker is a fully managed platform for developers/data scientists to build, train, tune, and deploy CUSTOM machine learning models. Pre-trained AI APIs (Rekognition, Polly, Comprehend) require ZERO machine learning knowledge and NO custom model training.',
      vi: 'SageMaker so với các API AI có sẵn: SageMaker là nền tảng quản lý toàn diện cho Data Scientist/Developer tự xây dựng, huấn luyện và triển khai mô hình ML TÙY CHỈNH. Các dịch vụ như Rekognition, Polly, Translate, Comprehend là API đã được AWS huấn luyện sẵn (Pre-trained), dùng ngay qua API mà KHÔNG cần biết kiến thức Machine Learning.',
      isCoreHighlight: true
    },
    {
      en: 'Kendra vs Personalize: Kendra is an intelligent enterprise document search engine (answers natural questions from company docs in S3, SharePoint, etc.). Personalize provides real-time personalized recommendations (e.g., e-commerce products, movies, articles, Amazon.com tech).',
      vi: 'Kendra so với Personalize: Kendra là công cụ tìm kiếm tài liệu nội bộ doanh nghiệp thông minh (trả lời câu hỏi tự nhiên từ kho dữ liệu S3, SharePoint, Salesforce). Personalize cung cấp hệ thống gợi ý sản phẩm cá nhân hóa thời gian thực (công nghệ của Amazon.com để gợi ý hàng hóa, phim ảnh).',
      isCoreHighlight: true
    }
  ],
  lectures: [
    {
      id: 'lec-198',
      number: 198,
      titleEn: 'Amazon Rekognition: Computer Vision & Image/Video Analysis',
      titleVi: 'Amazon Rekognition: Thị giác Máy tính & Phân tích Hình ảnh / Video',
      duration: '10m',
      summaryEn: 'Amazon Rekognition uses deep learning to analyze images and videos. It can identify objects, people, text, scenes, activities, detect facial expressions, search faces against a catalog, recognize celebrities, and perform content moderation for unsafe or inappropriate material.',
      summaryVi: 'Amazon Rekognition sử dụng công nghệ Deep Learning để phân tích hình ảnh và video. Dịch vụ tự động nhận diện đồ vật, con người, chữ viết, khung cảnh, phân tích khuôn mặt (cảm xúc, giới tính, tuổi tác), tìm kiếm khuôn mặt theo kho dữ liệu, nhận diện người nổi tiếng và kiểm duyệt nội dung độc hại/nhạy cảm.',
      keyPointsEn: [
        'Core Function: Computer vision service powered by deep learning for automated image and video analysis without requiring machine learning expertise.',
        'Labels & Object Detection: Identifies thousands of objects (vehicles, furniture, animals, trees) and scenes (beach, city, sunset) with confidence scores.',
        'Facial Analysis: Analyzes facial attributes such as emotions (happy, sad, surprised), eyes open, smiling, sunglasses, beard, and estimated age range.',
        'Face Search & Verification: Compares a face in an image against a private collection of faces (ideal for user authentication, security check-in, employee badge validation).',
        'Celebrity Recognition: Instantly detects famous actors, politicians, and public figures in media archives.',
        'Content Moderation: Identifies explicit, inappropriate, or suggestive content to automatically flag or blur unsafe images in user-generated uploads.',
        'Custom Labels: Train custom computer vision models with as few as 10 images (e.g., identify specific machine components, brand logos, or agricultural defects).',
        'Video Analysis: Supports live streaming video analysis via Amazon Kinesis Video Streams or stored video files in Amazon S3.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch vụ thị giác máy tính (Computer Vision) dùng Deep Learning phân tích ảnh và video tự động mà không đòi hỏi lập trình viên phải có kiến thức ML.',
        'Gắn nhãn & Nhận diện vật thể (Labels): Tự động nhận diện hàng nghìn đồ vật (xe cộ, chó mèo, nhà cửa) và bối cảnh (bãi biển, thành phố) kèm điểm độ tin cậy (confidence score).',
        'Phân tích khuôn mặt (Facial Analysis): Phân tích đặc điểm khuôn mặt như cảm xúc (vui vẻ, buồn bã, ngạc nhiên), mắt mở/nhắm, đeo kính, có râu, và độ tuổi ước lượng.',
        'Tìm kiếm & Đối chiếu khuôn mặt (Face Search): So khớp khuôn mặt trong ảnh với kho lưu trữ khuôn mặt có sẵn (dùng cho xác thực danh tính, chấm công, kiểm soát ra vào).',
        'Nhận diện người nổi tiếng (Celebrity Recognition): Phát hiện diễn viên, chính khách, vận động viên thể thao nổi tiếng trong kho lưu trữ truyền thông.',
        'Kiểm duyệt nội dung (Content Moderation): Phát hiện nội dung khiêu dâm, bạo lực hoặc không phù hợp để gắn cờ hoặc làm mờ nội dung do người dùng tải lên.',
        'Custom Labels: Huấn luyện mô hình thị giác riêng chỉ với vài bức ảnh mẫu (ví dụ: nhận diện logo công ty, phát hiện lỗi sản phẩm trên dây chuyền sản xuất).',
        'Phân tích Video: Hỗ trợ phân tích video thời gian thực từ camera luồng qua Amazon Kinesis Video Streams hoặc phân tích file video lưu trữ trên Amazon S3.'
      ],
      table: {
        headers: ['Đặc điểm (Feature)', 'Amazon Rekognition', 'Amazon Textract'],
        rows: [
          ['Mục tiêu phân tích', 'Ảnh và Video (Visual media)', 'Tài liệu quét, PDF, Biểu mẫu giấy'],
          ['Đối tượng nhận diện', 'Đồ vật, con người, khuôn mặt, cảnh quan, người nổi tiếng', 'Chữ viết tay, văn bản đánh máy, biểu mẫu, bảng biểu'],
          ['Kiểm duyệt nội dung', 'Có (Content Moderation lọc ảnh nhạy cảm/bạo lực)', 'Không'],
          ['Trích xuất cấu trúc bảng', 'Không (chỉ nhận diện text trong ảnh dạng biển hiệu)', 'Có (giữ nguyên cấu trúc Row, Column, Cell)'],
          ['Tích hợp Video', 'Có (Hỗ trợ Live Video qua Kinesis Video Streams)', 'Không (chỉ hỗ trợ văn bản tĩnh/PDF)'],
          ['Từ khóa thi CLF-C02', '"Object detection", "Face comparison", "Content moderation"', '"Scanned documents", "Extract tables and forms", "Invoices"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: Whenever the question mentions "detect objects in images", "facial recognition / comparison", "celebrity identification", or "moderate inappropriate images uploaded by users", choose Amazon Rekognition.',
        'Exam Trap: If the question asks to extract text, tables, or form key-values from scanned receipts or PDFs, do NOT choose Rekognition. Choose Amazon Textract.',
        'Real-time Video: Amazon Rekognition Video connects directly with Amazon Kinesis Video Streams for real-time security surveillance.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: Khi câu hỏi có cụm từ "detect objects in images" (nhận diện vật thể), "facial analysis / face comparison" (so khớp khuôn mặt), "celebrity recognition" (nhận diện người nổi tiếng), hoặc "content moderation" (kiểm duyệt nội dung nhạy cảm), CHỌN NGAY Amazon Rekognition.',
        'Bẫy phòng thi: Nếu câu hỏi yêu cầu đọc chữ, bóc tách bảng biểu hoặc cặp thông tin key-value từ hóa đơn hoặc file PDF quét scan, KHÔNG ĐƯỢC CHỌN Rekognition. Hãy chọn Amazon Textract.',
        'Phân tích video trực tiếp: Rekognition Video phối hợp hoàn hảo với Amazon Kinesis Video Streams để giám sát an ninh camera theo thời gian thực.'
      ],
      isCore: true
    },
    {
      id: 'lec-199',
      number: 199,
      titleEn: 'Amazon Transcribe: Speech-to-Text Automatic Speech Recognition',
      titleVi: 'Amazon Transcribe: Chuyển đổi Giọng nói thành Văn bản (Speech-to-Text)',
      duration: '8m',
      summaryEn: 'Amazon Transcribe uses Automatic Speech Recognition (ASR) deep learning models to convert speech audio files or live audio streams into accurate text transcripts. It supports automatic language identification, custom vocabularies, and automatic PII redaction.',
      summaryVi: 'Amazon Transcribe sử dụng công nghệ Nhận dạng Giọng nói Tự động (ASR) để chuyển đổi âm thanh ghi âm hoặc luồng âm thanh trực tiếp thành văn bản chữ viết. Dịch vụ hỗ trợ tự động phát hiện ngôn ngữ, từ vựng chuyên ngành tùy chỉnh và tự động che giấu thông tin định danh cá nhân PII.',
      keyPointsEn: [
        'Core Function: Automatic Speech Recognition (ASR) service that converts speech into written text transcripts.',
        'Input Formats: Supports recorded audio files in Amazon S3 (FLAC, MP3, WAV) as well as real-time audio streams (via HTTP/2 or WebSockets).',
        'Automatic Language Identification: Detects the primary language spoken in the audio without needing humans to specify the language upfront.',
        'PII Redaction: Automatically masks Personally Identifiable Information (SSN, credit card numbers, phone numbers, email addresses, dates of birth) in call transcripts using [PII] placeholders.',
        'Custom Vocabularies: Add domain-specific terminology, technical jargon, acronyms, or corporate names to dramatically improve transcription accuracy.',
        'Multi-channel Audio: Transcribes customer and call center agent audio channels separately and synthesizes them into a unified transcript with speaker labels (Speaker Diarization).',
        'Transcribe Call Analytics: Extracts customer sentiment, call categorization, agent talk time, and issue resolution from customer service calls.',
        'Transcribe Medical: Specially tuned speech-to-text model for clinical conversations and medical terminology.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch vụ nhận diện giọng nói tự động (Automatic Speech Recognition - ASR) biến lời nói âm thanh thành văn bản văn bản chính xác.',
        'Định dạng đầu vào: Hỗ trợ cả file âm thanh ghi sẵn trên Amazon S3 (MP3, WAV, FLAC) và luồng âm thanh trực tiếp (real-time stream qua HTTP/2 hoặc WebSockets).',
        'Tự động nhận diện ngôn ngữ (Auto Language ID): Tự động phát hiện ngôn ngữ đang được nói trong đoạn ghi âm mà không cần người dùng chỉ định trước.',
        'Che giấu thông tin cá nhân PII (PII Redaction): Tự động phát hiện và làm mờ các thông tin nhạy cảm (số thẻ tín dụng, số an sinh xã hội, số điện thoại, ngày sinh) bằng ký hiệu [PII] trong bản ghi.',
        'Từ vựng tùy chỉnh (Custom Vocabulary): Thêm các thuật ngữ chuyên môn, từ viết tắt công nghệ hoặc tên thương hiệu riêng để nâng cao độ chính xác khi chuyển dịch.',
        'Xử lý âm thanh đa kênh (Multi-channel / Speaker Diarization): Tách biệt giọng nói của khách hàng và nhân viên tư vấn tổng đài trên từng kênh âm thanh riêng biệt để gắn nhãn người nói rõ ràng.',
        'Transcribe Call Analytics: Tự động phân tích các cuộc gọi tổng đài để chấm điểm cảm xúc khách hàng, thời lượng nói và nội dung chính.',
        'Transcribe Medical: Phiên bản chuyên biệt được huấn luyện riêng để nghe và chuyển ngữ các thuật ngữ y khoa phức tạp của bác sĩ và bệnh nhân.'
      ],
      table: {
        headers: ['Thuộc tính', 'Amazon Transcribe', 'Amazon Polly', 'Amazon Translate'],
        rows: [
          ['Hướng chuyển đổi', 'Âm thanh ➡️ Văn bản (Speech to Text)', 'Văn bản ➡️ Âm thanh (Text to Speech)', 'Văn bản ngôn ngữ A ➡️ Văn bản ngôn ngữ B'],
          ['Công nghệ cốt lõi', 'Automatic Speech Recognition (ASR)', 'Speech Synthesis (Neural TTS)', 'Neural Machine Translation (NMT)'],
          ['Tính năng bảo mật nổi bật', 'Tự động che PII (PII Redaction)', 'Tùy chỉnh phát âm Lexicons & SSML', 'Custom Terminology cho tên thương hiệu'],
          ['Ứng dụng thực tế', 'Tạo phụ đề video, lưu biên bản cuộc gọi', 'Đọc sách nói, phát thanh tự động, IVR', 'Bản địa hóa website, dịch hỗ trợ khách hàng'],
          ['Từ khóa đề thi CLF-C02', '"Speech-to-text", "Subtitles", "Mask PII in audio"', '"Text-to-speech", "Lifelike voices", "Audiobook"', '"Translate languages", "Multilingual content"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Speech to text", "generate closed captions for videos", "transcribe customer support calls", or "redact PII from audio recording transcripts" = Amazon Transcribe.',
        'Memory Trick: TRANSCRIBE = WRITE DOWN what is spoken (Voice ➡️ Text).',
        'Exam Architecture: Video in S3 ➡️ Transcribe generates transcript ➡️ Translate converts to Spanish ➡️ Polly generates Spanish voiceover.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Speech to text" (giọng nói thành chữ), "closed captioning / subtitles" (tạo phụ đề video), "transcribe customer calls" (ghi lại nội dung cuộc gọi), hoặc "redact PII from audio" (che thông tin nhạy cảm trong file ghi âm) = CHỌN Amazon Transcribe.',
        'Mẹo ghi nhớ: TRANSCRIBE là "ghi chép lại" lời người khác nói (Giọng nói ➡️ Văn bản).',
        'Kiến trúc đề thi hay hỏi: File video trên S3 ➡️ Transcribe tạo phụ đề tiếng Anh ➡️ Translate dịch sang tiếng Việt ➡️ Polly đọc lồng tiếng tiếng Việt.'
      ],
      isCore: true
    },
    {
      id: 'lec-200',
      number: 200,
      titleEn: 'Amazon Polly: Text-to-Speech Lifelike Voice Synthesis',
      titleVi: 'Amazon Polly: Chuyển đổi Văn bản thành Giọng nói Tự nhiên (Text-to-Speech)',
      duration: '8m',
      summaryEn: 'Amazon Polly turns text into lifelike speech using advanced deep learning. It allows you to create applications that talk, build voice-enabled products, and produce audio versions of articles, books, and notifications across dozens of languages and voices.',
      summaryVi: 'Amazon Polly chuyển đổi văn bản chữ viết thành giọng nói tự nhiên chân thực nhờ công nghệ Deep Learning. Dịch vụ cho phép phát triển các ứng dụng biết nói, sách nói, đọc báo tự động và thông báo phát thanh bằng hàng chục ngôn ngữ và giọng đọc khác nhau.',
      keyPointsEn: [
        'Core Function: Text-to-Speech (TTS) service that synthesizes human-like speech from written text.',
        'Neural TTS & Standard Voices: Offers standard voices as well as Neural Text-to-Speech (NTTS) voices that deliver advanced conversational and newscaster vocal styles with human-like intonation.',
        'Lexicons (Custom Pronunciation): Customize how specific words, acronyms, or foreign terms are spoken (e.g., expand "AWS" into "Amazon Web Services", or specify phonetic pronunciation for medical terms).',
        'SSML (Speech Synthesis Markup Language): XML-based markup to control speech attributes: pauses, whispering, pitch, volume, speaking rate, and breathing sounds.',
        'Audio Formats & Storage: Exports audio in standard formats (MP3, OGG, PCM) which can be streamed directly or cached/saved to Amazon S3 for reuse without re-synthesizing.',
        'Voice Styles: Supports specialized speaking styles such as Newscaster style (sound like professional news anchor) and Conversational style.',
        'Real-time & Asynchronous: Real-time synthesis for interactive apps; Asynchronous synthesis (StartSpeechSynthesisTask) for long articles and entire ebooks.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch vụ Text-to-Speech (TTS) chuyển đổi văn bản chữ viết thành giọng đọc âm thanh tự nhiên như người thật.',
        'Giọng đọc Neural (NTTS) & Tiêu chuẩn: Cung cấp hàng chục giọng đọc tự nhiên chuẩn và giọng Neural tiên tiến tái tạo nhịp điệu, ngữ điệu đàm thoại hoặc phong cách biên tập viên thời sự.',
        'Lexicons (Từ điển phát âm tùy chỉnh): Tùy biến cách phát âm của các từ đặc biệt, từ viết tắt hoặc tên riêng (ví dụ: đọc từ viết tắt "AWS" thành "Amazon Web Services" hoặc phiên âm tên tiếng nước ngoài).',
        'Thẻ SSML (Speech Synthesis Markup Language): Sử dụng thẻ định dạng XML để điều khiển chi tiết giọng nói: ngắt nghỉ hơi thở, nói thì thầm (whisper), tăng giảm cao độ, âm lượng và tốc độ đọc.',
        'Định dạng tệp & Lưu trữ: Xuất file âm thanh ra định dạng MP3, OGG, PCM; có thể phát trực tiếp cho người dùng hoặc lưu file vào Amazon S3 để phát lại không tốn thêm phí chuyển đổi.',
        'Phong cách đọc: Hỗ trợ phong cách đọc tin tức (Newscaster style) và phong cách trò chuyện tự nhiên (Conversational style).',
        'Xử lý thời gian thực & Bất đồng bộ: Tạo giọng đọc tức thì cho ứng dụng trò chuyện; hỗ trợ tác vụ bất đồng bộ (StartSpeechSynthesisTask) để đọc các bài báo dài hoặc nguyên cuốn sách nói (audiobook).'
      ],
      table: {
        headers: ['Khía cạnh kỹ thuật', 'Chi tiết Amazon Polly', 'Ý nghĩa đối với kỳ thi CLF-C02'],
        rows: [
          ['Chức năng cốt lõi', 'Text-to-Speech (TTS)', 'Biến chữ thành giọng nói'],
          ['Công nghệ Neural TTS', 'Tạo giọng nói tự nhiên, truyền cảm, phong cách biên tập viên', 'Chất lượng âm thanh tự nhiên như người thật'],
          ['Tùy chỉnh phát âm Lexicons', 'Quy định cách phát âm từ viết tắt hoặc từ chuyên môn', 'Giải pháp khi cần phát âm tên thương hiệu chuẩn xác'],
          ['Định dạng SSML', 'Thêm thẻ tạm dừng, thì thầm, thay đổi tốc độ đọc', 'Tùy biến nhịp điệu đọc theo kịch bản'],
          ['Lưu trữ kết quả', 'Lưu file âm thanh MP3 vào Amazon S3', 'Tiết kiệm chi phí bằng cách tái sử dụng file âm thanh']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Text to speech", "generate audio files from text articles", "create audiobooks", "convert blog posts into podcast audio" = Amazon Polly.',
        'Memory Trick: POLLY = Like a parrot that speaks aloud what you give it in writing (Text ➡️ Voice).',
        'Lexicons vs SSML: Lexicons define HOW specific words are pronounced across all texts; SSML controls dynamic delivery (whispering, pauses, pitch) within a specific text.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Text to speech" (văn bản thành giọng nói), "generate audio from articles" (tạo file âm thanh từ bài báo), "audiobooks" (làm sách nói), "convert blog to podcast" (biến bài blog thành podcast) = CHỌN Amazon Polly.',
        'Mẹo ghi nhớ: POLLY giống chú vẹt biết nói lại những gì bạn viết ra giấy (Văn bản ➡️ Giọng nói).',
        'Phân biệt Lexicons và SSML: Lexicons quy định CÁCH PHÁT ÂM của một từ nhất định (như từ viết tắt); SSML là các THẺ ĐIỀU KHIỂN biểu cảm (ngắt nghỉ, thì thầm, cao độ).'
      ],
      isCore: true
    },
    {
      id: 'lec-201',
      number: 201,
      titleEn: 'Amazon Translate: Fast, High-Quality Neural Language Translation',
      titleVi: 'Amazon Translate: Dịch thuật Ngôn ngữ Tự nhiên & Đa ngữ Tốc độ cao',
      duration: '7m',
      summaryEn: 'Amazon Translate is a neural machine translation service that delivers fast, high-quality, and customizable language translation. It enables businesses to localize content such as websites, applications, and customer support for international users.',
      summaryVi: 'Amazon Translate là dịch vụ dịch máy theo mô hình Neural Machine Translation mang lại bản dịch nhanh chóng, tự nhiên và trôi chảy. Dịch vụ giúp các doanh nghiệp dễ dàng bản địa hóa nội dung website, ứng dụng và hệ thống hỗ trợ khách hàng đa ngôn ngữ.',
      keyPointsEn: [
        'Core Function: Neural Machine Translation (NMT) service supporting fluent translations between dozens of languages.',
        'Real-time & Batch Translation: Provides real-time translation for interactive chat messages/websites and asynchronous batch translation for millions of documents.',
        'Custom Terminology: Upload a custom terminology dictionary (CSV/TMX) so proprietary brand names, product titles, or industry jargon are translated exactly as desired (or kept in original language).',
        'Language Auto-Detection: Automatically detects the source language when translating unknown inbound texts.',
        'Integration: Integrates with Amazon Comprehend for sentiment analysis and Amazon Polly for text-to-speech audio localization.',
        'Cost Efficiency: Pay only for the number of characters processed; far more cost-effective and scalable than manual translation teams for bulk content.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch máy sử dụng mạng nơ-ron (Neural Machine Translation) dịch thuật mượt mà và tự nhiên giữa hàng chục ngôn ngữ trên toàn thế giới.',
        'Dịch thời gian thực & Dịch theo lô: Cung cấp API dịch thời gian thực cho tin nhắn chat/website và dịch theo lô (Batch Translation) cho hàng triệu tài liệu lưu trên S3.',
        'Thuật ngữ tùy chỉnh (Custom Terminology): Cho phép tải lên bảng thuật ngữ riêng để bảo đảm tên thương hiệu, tên sản phẩm độc quyền hoặc từ chuyên môn không bị dịch sai hoặc được giữ nguyên bản gốc.',
        'Tự động nhận diện ngôn ngữ nguồn: Tự động phát hiện văn bản đầu vào là ngôn ngữ nào mà không cần người dùng khai báo.',
        'Tích hợp hệ sinh thái AWS: Kết hợp với Amazon Comprehend để phân tích văn bản sau dịch và Amazon Polly để phát âm thanh bản dịch.',
        'Tối ưu chi phí: Tính phí theo số lượng ký tự văn bản được dịch; chi phí rẻ hơn hàng trăm lần so với dịch thủ công truyền thống.'
      ],
      table: {
        headers: ['Kịch bản ứng dụng', 'Dịch vụ chủ đạo', 'Lợi ích kinh doanh'],
        rows: [
          ['Bản địa hóa website thương mại điện tử', 'Amazon Translate', 'Tự động hiển thị mô tả sản phẩm bằng tiếng địa phương'],
          ['Chatbot đa quốc gia', 'Amazon Translate + Amazon Lex', 'Khách hàng nhắn tiếng Tây Ban Nha, bot xử lý bằng tiếng Anh'],
          ['Tạo phụ đề đa ngôn ngữ cho video', 'Transcribe ➡️ Translate ➡️ S3', 'Tạo file phụ đề SRT/VTT cho nhiều thứ tiếng'],
          ['Hỗ trợ khách hàng quốc tế qua email', 'Amazon Translate + Comprehend', 'Dịch email khách về tiếng bản ngữ và đo độ hài lòng']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Language translation", "localize website for international audience", "real-time multilingual chat translation", or "Custom Terminology for brand names" = Amazon Translate.',
        'Distinction: Transcribe converts Speech ➡️ Text. Translate converts Language A ➡️ Language B.',
        'Cost Model: Pay-as-you-go based on total characters translated.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Language translation" (dịch ngôn ngữ), "localize website for global users" (bản địa hóa trang web), "real-time multilingual chat" (dịch tin nhắn chat trực tiếp) = CHỌN Amazon Translate.',
        'Phân biệt rõ: Transcribe là đổi Giọng nói ➡️ Văn bản. Translate là dịch từ Tiếng A ➡️ Tiếng B.',
        'Mô hình tính giá: Tính tiền theo số lượng ký tự được dịch (Pay-per-character).'
      ],
      isCore: true
    },
    {
      id: 'lec-202',
      number: 202,
      titleEn: 'Amazon Lex & Amazon Connect: Chatbots & Cloud Contact Center',
      titleVi: 'Amazon Lex & Amazon Connect: Chatbot Đàm thoại & Tổng đài Ảo trên Cloud',
      duration: '12m',
      summaryEn: 'Amazon Lex powers conversational interfaces (chatbots) using the same deep learning engine as Amazon Alexa (ASR + NLU). Amazon Connect is a cloud-based omnichannel virtual contact center. When combined, Lex acts as the intelligent automated phone bot for Connect call flows.',
      summaryVi: 'Amazon Lex cung cấp công cụ xây dựng chatbot đàm thoại bằng giọng nói và chữ viết sử dụng chính công nghệ của trợ lý ảo Amazon Alexa (ASR + NLU). Amazon Connect là giải pháp tổng đài ảo đa kênh trên đám mây. Khi kết hợp, Lex đóng vai trò là tổng đài viên AI tự động tiếp nhận cuộc gọi cho Connect.',
      keyPointsEn: [
        'Amazon Lex: Conversational AI service for building conversational interfaces (chatbots) into any application using voice and text.',
        'Alexa Technology: Powered by the exact same Automatic Speech Recognition (ASR) and Natural Language Understanding (NLU) technology as Amazon Alexa.',
        'Lex Core Concepts: Intent (what the user wants to achieve), Utterance (how user phrases it), Slot (parameters needed, e.g., date, city), and Fulfillment (business logic executed via AWS Lambda).',
        'Amazon Connect: Omnichannel cloud contact center that can be set up in minutes without any physical telephony hardware or PBX appliances.',
        'Connect Capabilities: Inbound/outbound calling, IVR (Interactive Voice Response), contact flow designer, agent routing, call recording, and CRM integration (Salesforce).',
        'Cost Savings: Traditional call centers require expensive upfront PBX hardware and licensing; Amazon Connect is pay-as-you-go per minute of customer interaction (up to 80% cheaper).',
        'The Lex + Connect Synergy: Use Amazon Lex bots inside Amazon Connect contact flows to triage callers, answer common questions automatically, and route complex issues to human agents.'
      ],
      keyPointsVi: [
        'Amazon Lex: Dịch vụ trí tuệ nhân tạo đàm thoại (Conversational AI) giúp xây dựng chatbot trả lời bằng văn bản hoặc giọng nói vào bất kỳ ứng dụng nào.',
        'Công nghệ của Alexa: Sử dụng chung công nghệ Nhận diện Giọng nói (ASR) và Hiểu Ngôn ngữ Tự nhiên (Natural Language Understanding - NLU) của trợ lý ảo Amazon Alexa.',
        'Khái niệm cốt lõi của Lex: Intent (ý định của người dùng, ví dụ đặt phòng khách sạn), Utterance (câu nói mẫu người dùng dùng để gọi), Slot (thông tin cần thu thập, ví dụ ngày đến, thành phố), Fulfillment (thực thi logic qua AWS Lambda).',
        'Amazon Connect: Dịch vụ tổng đài chăm sóc khách hàng đa kênh trên đám mây (Cloud Contact Center) triển khai trong vài phút mà không cần thiết bị tổng đài vật lý PBX.',
        'Tính năng của Connect: Tiếp nhận và thực hiện cuộc gọi, cây phản hồi tự động IVR, điều phối cuộc gọi cho nhân viên tư vấn, ghi âm cuộc gọi và tích hợp CRM (Salesforce).',
        'Tiết kiệm chi phí vượt trội: Thay vì tốn hàng chục ngàn USD đầu tư phần cứng tổng đài truyền thống, Amazon Connect chỉ tính phí theo số phút khách hàng kết nối (rẻ hơn đến 80%).',
        'Sự kết hợp hoàn hảo Lex + Connect: Nhúng bot Amazon Lex vào luồng cuộc gọi Amazon Connect để làm tổng đài viên ảo tự động giải đáp thắc mắc cơ bản trước khi chuyển cho người thật.'
      ],
      table: {
        headers: ['Khía cạnh so sánh', 'Amazon Lex', 'Amazon Connect'],
        rows: [
          ['Bản chất dịch vụ', 'Công cụ tạo Chatbot đàm thoại (Voice & Text bot engine)', 'Hệ thống tổng đài chăm sóc khách hàng ảo (Contact Center)'],
          ['Công nghệ nền tảng', 'Công nghệ của trợ lý ảo Amazon Alexa (ASR + NLU)', 'Công nghệ trung tâm chăm sóc khách hàng của Amazon.com'],
          ['Đầu vào tương tác', 'Tin nhắn chat hoặc câu lệnh thoại trên app/web', 'Cuộc gọi điện thoại viễn thông, web chat, SMS'],
          ['Xử lý nghiệp vụ', 'Kích hoạt AWS Lambda function để kiểm tra dữ liệu/đặt chỗ', 'Điều phối cuộc gọi đến nhân viên tư vấn, tạo cây IVR'],
          ['Mô hình định giá', 'Tính theo số lượng yêu cầu văn bản hoặc giọng nói xử lý', 'Tính theo số phút tương tác cuộc gọi của khách hàng'],
          ['Từ khóa đề thi CLF-C02', '"Build a chatbot", "Alexa technology", "Conversational AI"', '"Cloud contact center", "Customer service calls", "Virtual PBX"']
        ]
      },
      examTipsEn: [
        'Keyword Alert Lex: "Build a chatbot", "conversational interface using voice and text", "Alexa technology" = Amazon Lex.',
        'Keyword Alert Connect: "Cloud contact center", "customer service phone calls", "IVR telephony system", "replace on-premise PBX" = Amazon Connect.',
        'Synergy Question: "A company wants to set up an automated phone system that understands customer voice requests and routes calls" = Amazon Connect integrated with Amazon Lex.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết Lex: "Build a chatbot" (tạo chatbot), "conversational voice/text interface" (giao diện đàm thoại bằng giọng nói và chữ), "Amazon Alexa technology" = CHỌN Amazon Lex.',
        'Dấu hiệu nhận biết Connect: "Cloud contact center" (tổng đài trên mây), "customer service hotline" (đường dây nóng chăm sóc khách hàng), "replace PBX" (thay thế tổng đài vật lý) = CHỌN Amazon Connect.',
        'Câu hỏi kết hợp kinh điển: "Doanh nghiệp muốn lập tổng đài ảo tự động nhận diện giọng nói của khách gọi đến để phân luồng" = Kết hợp Amazon Connect với Amazon Lex.'
      ],
      isCore: true
    },
    {
      id: 'lec-203',
      number: 203,
      titleEn: 'Amazon Comprehend: Natural Language Processing (NLP) & Sentiment Analysis',
      titleVi: 'Amazon Comprehend: Xử lý Ngôn ngữ Tự nhiên (NLP) & Phân tích Cảm xúc',
      duration: '9m',
      summaryEn: 'Amazon Comprehend is a Natural Language Processing (NLP) service that uses machine learning to discover valuable insights and relationships in unstructured text. It automatically detects language, extracts key phrases, analyzes sentiment, identifies entities, and redacts PII.',
      summaryVi: 'Amazon Comprehend là dịch vụ Xử lý Ngôn ngữ Tự nhiên (NLP) sử dụng Machine Learning để bóc tách thông tin chi tiết và mối quan hệ từ văn bản phi cấu trúc. Dịch vụ tự động phát hiện ngôn ngữ, trích xuất cụm từ khóa, phân tích cảm xúc (tích cực/tiêu cực), nhận diện thực thể và bảo vệ thông tin PII.',
      keyPointsEn: [
        'Core Function: Fully managed Natural Language Processing (NLP) service that extracts insights from text documents without needing ML model development.',
        'Sentiment Analysis: Analyzes text and classifies sentiment into Positive, Negative, Neutral, or Mixed, along with statistical confidence scores.',
        'Entity Recognition: Identifies references to people, places, locations, dates, organizations, and quantities within text documents.',
        'Key Phrase Extraction: Identifies noun phrases and main concepts representing the core subjects discussed in the text.',
        'Language Detection: Detects the language of the document across over 100 languages.',
        'PII Detection & Redaction: Detects and automatically masks Personally Identifiable Information (SSN, bank accounts, emails, phone numbers) in text files.',
        'Topic Modeling: Organizes massive collections of documents into topical clusters based on shared themes.',
        'Comprehend Medical: Specialized NLP service for medical records to identify medical conditions, anatomy, medications, tests, and dosages from doctor notes.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch vụ Xử lý Ngôn ngữ Tự nhiên (NLP) được quản lý hoàn toàn giúp trích xuất tri thức từ văn bản phi cấu trúc mà không cần tự huấn luyện mô hình.',
        'Phân tích cảm xúc (Sentiment Analysis): Phân loại cảm xúc của bài đánh giá hoặc bình luận thành Tích cực (Positive), Tiêu cực (Negative), Trung tính (Neutral) hoặc Hỗn hợp (Mixed).',
        'Nhận diện thực thể (Entity Recognition): Tự động phát hiện tên người, địa danh, ngày tháng, tên tổ chức và số lượng trong đoạn văn.',
        'Trích xuất cụm từ khóa (Key Phrase Extraction): Trích xuất các cụm danh từ và khái niệm quan trọng phản ánh chủ đề chính của văn bản.',
        'Phát hiện ngôn ngữ: Tự động nhận diện ngôn ngữ của tài liệu trong hơn 100 ngôn ngữ được hỗ trợ.',
        'Phát hiện & Che giấu PII trong văn bản: Tự động dò tìm và che giấu các thông tin định danh cá nhân (số thẻ ngân hàng, CCCD, email) trong văn bản lưu trữ.',
        'Phân cụm chủ đề (Topic Modeling): Quét hàng triệu tài liệu và tự động nhóm các bài viết có nội dung tương tự vào cùng một chủ đề.',
        'Comprehend Medical: Phiên bản chuyên biệt dành cho y tế giúp phân tích hồ sơ bệnh án, đơn thuốc, triệu chứng và liều lượng từ ghi chép của bác sĩ.'
      ],
      table: {
        headers: ['Khả năng của Amazon Comprehend', 'Ví dụ dữ liệu đầu vào', 'Kết quả trả về'],
        rows: [
          ['Phân tích cảm xúc (Sentiment)', '"Tôi cực kỳ thất vọng về chất lượng dịch vụ lần này"', 'Negative (98% confidence)'],
          ['Nhận diện thực thể (Entity)', '"Jeff Bezos thành lập Amazon tại Seattle năm 1994"', 'Person: Jeff Bezos, Org: Amazon, Loc: Seattle, Date: 1994'],
          ['Trích xuất cụm từ khóa (Key Phrases)', '"Thời lượng pin tuyệt vời và màn hình sắc nét"', 'Thời lượng pin, màn hình sắc nét'],
          ['Che giấu PII trong văn bản', '"Khách hàng Nguyễn Văn A có số CMND 123456789"', '"Khách hàng [NAME] có số CMND [SSN]"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Natural Language Processing (NLP)", "sentiment analysis of customer reviews or tweets", "extract key phrases and entities", "find topics in text" = Amazon Comprehend.',
        'Distinction: Comprehend is for TEXT understanding. Rekognition is for IMAGES/VIDEO understanding.',
        'Use Case: Analyze social media posts about a brand product launch to see if customer reactions are positive or negative.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Natural Language Processing (NLP)" (xử lý ngôn ngữ tự nhiên), "sentiment analysis" (phân tích cảm xúc khen/chê của review), "extract key phrases / entities" (trích xuất từ khóa, tên người) = CHỌN Amazon Comprehend.',
        'Phân biệt nhanh: Comprehend hiểu ý nghĩa VĂN BẢN (Text). Rekognition hiểu ý nghĩa HÌNH ẢNH / VIDEO.',
        'Tình huống thực tế: Phân tích các tweet hoặc bài đăng Facebook của khách hàng sau khi ra mắt sản phẩm mới xem họ khen hay chê.'
      ],
      isCore: true
    },
    {
      id: 'lec-204',
      number: 204,
      titleEn: 'Amazon SageMaker: Full Lifecycle Machine Learning Platform',
      titleVi: 'Amazon SageMaker: Nền tảng Học máy Toàn diện cho Nhà phát triển & Nhà khoa học dữ liệu',
      duration: '12m',
      summaryEn: 'Amazon SageMaker is a fully managed machine learning service that provides every developer and data scientist with the tools to build, train, tune, and deploy custom Machine Learning models quickly. It covers the end-to-end ML workflow from data labeling to production deployment.',
      summaryVi: 'Amazon SageMaker là dịch vụ Machine Learning được quản lý toàn diện cung cấp cho mọi lập trình viên và chuyên gia khoa học dữ liệu đầy đủ công cụ để tự xây dựng, huấn luyện, tinh chỉnh và triển khai các mô hình ML tùy chỉnh. Dịch vụ bao quát toàn bộ vòng đời ML từ gán nhãn dữ liệu đến vận hành thực tế.',
      keyPointsEn: [
        'Core Function: Fully managed platform for developers and data scientists to build, train, tune, and deploy CUSTOM machine learning models at scale.',
        'The 4 Pillars of SageMaker: 1. Prepare & Label (SageMaker Ground Truth) ➡️ 2. Build (SageMaker Studio, Jupyter Notebooks) ➡️ 3. Train & Tune (managed EC2 clusters, Hyperparameter Optimization) ➡️ 4. Deploy & Monitor (managed inference endpoints, model drift detection).',
        'SageMaker Ground Truth: Easily build training datasets using human labelers (mechanical turk, private team, vendor) with automated data labeling.',
        'SageMaker Studio: First web-based integrated development environment (IDE) for complete machine learning workflow.',
        'Built-in Algorithms & Frameworks: Supports popular ML frameworks (TensorFlow, PyTorch, Scikit-learn, XGBoost, Hugging Face) and pre-optimized AWS algorithms.',
        'Hyperparameter Tuning (HPO): Automatically runs multiple training jobs with varying algorithm parameters to find the best-performing model.',
        'Managed Endpoints: Deploy trained models with a single click to auto-scaling HTTP endpoints for real-time inference or batch transform jobs.',
        'SageMaker JumpStart: Pre-trained foundation models and open-source models ready to deploy and fine-tune with a few clicks.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Nền tảng quản lý toàn diện giúp Data Scientist và Developer tự xây dựng, huấn luyện, tối ưu và triển khai các mô hình Machine Learning TÙY CHỈNH (Custom Models) ở quy mô lớn.',
        '4 giai đoạn trong quy trình ML của SageMaker: 1. Chuẩn bị & Gán nhãn (Ground Truth) ➡️ 2. Xây dựng mô hình (SageMaker Studio, Notebooks) ➡️ 3. Huấn luyện & Tinh chỉnh (EC2 cluster tự động, tối ưu siêu tham số) ➡️ 4. Triển khai & Giám sát (Endpoint tự co giãn, phát hiện suy giảm mô hình).',
        'SageMaker Ground Truth: Dịch vụ hỗ trợ dán nhãn dữ liệu huấn luyện nhanh chóng kết hợp nhân sự gắn nhãn thủ công và mô hình tự động gán nhãn.',
        'SageMaker Studio: Môi trường phát triển tích hợp (IDE) trên giao diện web đầu tiên chuyên dụng cho toàn bộ quy trình Machine Learning.',
        'Hỗ trợ mọi thư viện phổ biến: Tích hợp sẵn TensorFlow, PyTorch, Scikit-learn, XGBoost, Hugging Face cùng các thuật toán được tối ưu sẵn của AWS.',
        'Tự động tinh chỉnh siêu tham số (Hyperparameter Tuning): Tự động chạy nhiều phiên huấn luyện song song với các tham số khác nhau để tìm ra mô hình có độ chính xác cao nhất.',
        'Triển khai Endpoint tức thì: Triển khai mô hình đã hoàn thiện lên một API Endpoint tự co giãn chỉ với 1 cú click chuột để ứng dụng gọi inference thời gian thực.',
        'SageMaker JumpStart: Thư viện các mô hình nền tảng (Foundation Models) mã nguồn mở có sẵn để người dùng thử nghiệm và tinh chỉnh nhanh chóng.'
      ],
      table: {
        headers: ['Tiêu chí so sánh', 'Amazon SageMaker', 'Dịch vụ AI được quản lý sẵn (Rekognition, Polly, etc.)'],
        rows: [
          ['Loại mô hình', 'Mô hình ML tùy chỉnh riêng (Custom ML Models do bạn tự thiết kế)', 'Mô hình được huấn luyện sẵn bởi AWS (Pre-trained AI Models)'],
          ['Đối tượng người dùng', 'Data Scientists, ML Engineers, chuyên gia AI', 'Mọi lập trình viên phần mềm thông thường'],
          ['Yêu cầu kiến thức ML', 'Cần kiến thức về thuật toán, huấn luyện, tối ưu tham số', 'Không cần bất kỳ kiến thức nào về Machine Learning'],
          ['Quy trình xây dựng', 'Thu thập dữ liệu ➡️ Gán nhãn ➡️ Huấn luyện ➡️ Đánh giá ➡️ Triển khai', 'Gọi API ngay lập tức bằng SDK hoặc HTTP Request'],
          ['Trường hợp sử dụng', 'Dự đoán giá bất động sản riêng, phát hiện gian lận thẻ nội bộ', 'Nhận diện mặt người, đọc chữ từ ảnh, dịch ngôn ngữ'],
          ['Từ khóa đề thi CLF-C02', '"Build, train, deploy custom ML models", "Data scientist platform"', '"Pre-built AI API", "No ML knowledge required"']
        ]
      },
      examTipsEn: [
        'The #1 Exam Rule for SageMaker: If the question mentions "data scientists want to build and train custom models" or "full machine learning lifecycle", the answer is ALWAYS Amazon SageMaker.',
        'Exam Trap: If the question asks for face recognition or document translation and says "without developing machine learning models", do NOT choose SageMaker! Choose Rekognition or Translate.',
        'Ground Truth Keyword: "Label training datasets with human workers" = SageMaker Ground Truth.'
      ],
      examTipsVi: [
        'Quy tắc vàng đề thi: Nếu câu hỏi nhắc tới "data scientists want to build, train, deploy custom models" (chuyên gia dữ liệu muốn tự xây dựng và huấn luyện mô hình ML riêng) thì đáp án LUÔN LÀ Amazon SageMaker.',
        'Bẫy phòng thi: Nếu câu hỏi muốn nhận diện khuôn mặt hoặc dịch văn bản và nhấn mạnh "without machine learning expertise" (không cần kinh nghiệm ML), TUYỆT ĐỐI KHÔNG CHỌN SageMaker! Hãy chọn Rekognition hoặc Translate.',
        'Từ khóa Ground Truth: "Label datasets for training using human workers" = SageMaker Ground Truth.'
      ],
      isCore: true
    },
    {
      id: 'lec-205',
      number: 205,
      titleEn: 'Amazon Kendra: Intelligent Enterprise Document Search Powered by ML',
      titleVi: 'Amazon Kendra: Công cụ Tìm kiếm Tài liệu Doanh nghiệp Thông minh bằng ML',
      duration: '8m',
      summaryEn: 'Amazon Kendra is an intelligent enterprise document search service powered by Machine Learning. It enables organizations to search unstructured corporate documents using natural language questions rather than just keyword queries, delivering exact paragraph answers from connected data repositories.',
      summaryVi: 'Amazon Kendra là công cụ tìm kiếm tài liệu thông minh trong doanh nghiệp được hỗ trợ bởi Machine Learning. Dịch vụ cho phép nhân viên tìm kiếm tài liệu nội bộ bằng các câu hỏi tự nhiên thay vì chỉ gõ từ khóa đơn điệu, trả về chính xác câu trả lời và trích đoạn từ các kho dữ liệu kết nối.',
      keyPointsEn: [
        'Core Function: Machine Learning-powered enterprise search service that indexes and searches unstructured corporate data.',
        'Natural Language Search: Users can ask questions in conversational language (e.g., "How do I configure my company VPN?") and Kendra extracts the exact answer paragraph.',
        'Exact Answers & Snippets: Returns direct answers (extracts facts, numbers, dates) and document excerpts rather than just a list of hyperlink search results.',
        'Built-in Connectors: Pre-built connectors to index data from Amazon S3, Microsoft SharePoint, Salesforce, ServiceNow, Google Drive, Confluence, Microsoft OneDrive, and relational databases.',
        'Continuous Improvement: ML models continuously learn from user search interactions, feedback clicks, and thumbs up/down ratings to improve search accuracy over time.',
        'Access Control & Security: Respects corporate document access controls (Active Directory, LDAP, OAuth) so users only see search results they are authorized to access.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Công cụ tìm kiếm tài liệu nội bộ doanh nghiệp bằng Machine Learning giúp chỉ mục và tra cứu dữ liệu phi cấu trúc.',
        'Tìm kiếm bằng ngôn ngữ tự nhiên: Nhân viên có thể hỏi những câu hỏi hoàn chỉnh như người nói chuyện bình thường (ví dụ: "Chế độ nghỉ thai sản của công ty kéo dài bao lâu?") và Kendra trích xuất câu trả lời chuẩn xác.',
        'Trả về câu trả lời trực tiếp: Cung cấp câu trả lời cô đọng và đoạn văn bản trích dẫn chính xác thay vì chỉ hiển thị một danh sách đường link như công cụ tìm kiếm truyền thống.',
        'Bộ kết nối dữ liệu phong phú (Connectors): Tích hợp sẵn với Amazon S3, Microsoft SharePoint, Salesforce, ServiceNow, Google Drive, Confluence, OneDrive và cơ sở dữ liệu quan hệ.',
        'Tự động cải thiện liên tục: Mô hình ML liên tục học hỏi từ hành vi nhấp chuột và phản hồi đánh giá của người dùng để sắp xếp thứ tự kết quả ngày càng chính xác.',
        'Phân quyền bảo mật nghiêm ngặt: Đồng bộ hóa quyền truy cập tài liệu với hệ thống phân quyền doanh nghiệp (Active Directory) để nhân viên chỉ thấy những tài liệu mà họ có quyền xem.'
      ],
      table: {
        headers: ['Đặc điểm', 'Amazon Kendra', 'Amazon OpenSearch Service (Elasticsearch)'],
        rows: [
          ['Phương thức tìm kiếm', 'Ngôn ngữ tự nhiên (Natural language questions, semantic understanding)', 'Tìm kiếm theo từ khóa (Keyword matching, full-text inverted index)'],
          ['Kết quả trả về', 'Câu trả lời trích xuất trực tiếp + đoạn văn bản liên quan', 'Danh sách các tài liệu khớp từ khóa'],
          ['Độ phức tạp cài đặt', 'Dịch vụ Managed thông minh, cấu hình kết nối là dùng ngay', 'Phải tự thiết kế mapping, cluster, shard, analyzer'],
          ['Mục đích chính', 'Tìm kiếm tri thức nội bộ công ty (Intranet / Knowledge base search)', 'Tìm kiếm ứng dụng web, phân tích log tập trung (ELK Stack)'],
          ['Từ khóa đề thi CLF-C02', '"Enterprise document search", "Natural language search in corporate manuals"', '"Log analytics", "Full-text search engine", "ELK stack"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Intelligent enterprise search", "search internal company documents using natural language", "connectors to SharePoint/Salesforce/S3 for internal knowledge base" = Amazon Kendra.',
        'Exam Trap: If the question talks about searching logs or creating search functionality for an application using Elasticsearch -> choose Amazon OpenSearch Service. If it talks about internal corporate document search with natural questions -> choose Amazon Kendra.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Enterprise search engine" (công cụ tìm kiếm doanh nghiệp), "natural language search across internal documents" (tìm kiếm tài liệu nội bộ bằng câu hỏi tự nhiên), "SharePoint/Salesforce connectors" = CHỌN Amazon Kendra.',
        'Bẫy phòng thi: Nếu câu hỏi nói về phân tích log hoặc tìm kiếm dữ liệu ứng dụng kiểu Elasticsearch -> chọn Amazon OpenSearch Service. Nếu là tìm kiếm tài liệu quy chế, sổ tay nhân viên nội bộ -> chọn Amazon Kendra.'
      ],
      isCore: true
    },
    {
      id: 'lec-206',
      number: 206,
      titleEn: 'Amazon Personalize: Real-Time Personalized Recommendations Engine',
      titleVi: 'Amazon Personalize: Hệ thống Gợi ý Cá nhân hóa Thời gian thực',
      duration: '8m',
      summaryEn: 'Amazon Personalize brings the same real-time personalization and recommendation technology developed by Amazon.com directly to developers. It generates tailored product recommendations, personalized content feeds, and customized search re-rankings with minimal ML experience required.',
      summaryVi: 'Amazon Personalize mang đến cho các lập trình viên chính công nghệ gợi ý sản phẩm và cá nhân hóa trải nghiệm người dùng theo thời gian thực được Amazon.com hoàn thiện suốt hàng chục năm. Dịch vụ giúp tạo ra các danh sách gợi ý mua hàng, nội dung đề xuất và tái sắp xếp kết quả tìm kiếm.',
      keyPointsEn: [
        'Core Function: Real-time personalization and recommendation engine powered by machine learning, based on the technology perfected by Amazon.com.',
        'Use Cases: Personalized product recommendations for e-commerce, movie/video recommendations for streaming platforms, customized news feeds, tailored email marketing, and targeted notifications.',
        'Search Re-ranking: Re-ranks catalog search results based on the individual user’s historical preferences and past purchases.',
        'Similar Items: Identifies items similar to what a user is currently viewing (e.g., "Customers who bought this item also bought...").',
        'User Segmentation: Automatically segments users based on predicted interest in specific item attributes or categories.',
        'Cold-Start Problem: Effectively provides recommendations for new users and newly added products with zero or minimal interaction history.',
        'Real-time Responsiveness: Reacts to changing user intent and clicks in real time within milliseconds.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Động cơ cá nhân hóa và gợi ý sản phẩm theo thời gian thực sử dụng Machine Learning dựa trên công nghệ cốt lõi của trang thương mại điện tử Amazon.com.',
        'Các trường hợp ứng dụng: Gợi ý sản phẩm mua sắm trên web e-commerce, đề xuất video/phim ảnh trên nền tảng streaming, tùy biến bản tin cá nhân, cá nhân hóa nội dung email marketing.',
        'Tái sắp xếp kết quả tìm kiếm (Search Re-ranking): Sắp xếp lại thứ tự kết quả tìm kiếm theo sở thích và lịch sử mua sắm riêng của từng người dùng.',
        'Gợi ý sản phẩm tương tự (Similar Items): Tự động tìm các sản phẩm tương đồng với món đồ khách đang xem ("Khách hàng mua món này cũng thường mua thêm...").',
        'Phân khúc người dùng tự động (User Segmentation): Nhóm khách hàng theo mức độ quan tâm dự đoán đối với từng nhóm danh mục sản phẩm.',
        'Giải quyết bài toán Cold-Start: Đưa ra gợi ý thông minh ngay cả đối với người dùng mới tinh hoặc sản phẩm mới đăng chưa có lịch sử tương tác.',
        'Phản hồi thời gian thực: Cập nhật ngay lập tức các gợi ý tiếp theo dựa trên những cú click chuột của khách trong vài mili-giây.'
      ],
      table: {
        headers: ['Đặc tính', 'Amazon Personalize', 'Amazon Kendra'],
        rows: [
          ['Mục tiêu kinh doanh', 'Gợi ý sản phẩm/nội dung cá nhân hóa cho người dùng', 'Tìm kiếm thông tin chính xác trong tài liệu doanh nghiệp'],
          ['Dữ liệu đầu vào', 'Lịch sử click, lượt xem, giao dịch mua hàng, danh mục item', 'File tài liệu PDF, Word, HTML, bài viết trên intranet'],
          ['Công nghệ nguồn gốc', 'Công nghệ gợi ý của Amazon.com', 'Mô hình Natural Language Processing chuyên tìm kiếm'],
          ['Cách tương tác', 'Hệ thống tự động hiển thị gợi ý phù hợp trên màn hình', 'Người dùng chủ động gõ câu hỏi để tìm kiếm'],
          ['Từ khóa đề thi CLF-C02', '"Personalized product recommendations", "Amazon.com technology"', '"Enterprise document search", "Natural language queries"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Personalized recommendations", "recommend products or movies to users", "Amazon.com recommendation engine", "personalized re-ranking" = Amazon Personalize.',
        'Memory Hook: PERSONALize = makes the shopping/viewing experience PERSONAL to each customer.',
        'No ML Experience Needed: You supply user interaction data (clicks, purchases); Personalize builds and operates the custom recommendation model automatically.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Personalized recommendations" (gợi ý cá nhân hóa), "recommend products or content" (gợi ý sản phẩm hoặc nội dung), "Amazon.com technology" = CHỌN Amazon Personalize.',
        'Mẹo ghi nhớ: PERSONALIZE là làm cho trải nghiệm mua sắm mang tính CÁ NHÂN (Personal) cho từng người.',
        'Không cần kinh nghiệm ML: Bạn chỉ cần cung cấp dữ liệu tương tác (lịch sử click, đơn hàng); Personalize sẽ tự động xây dựng và vận hành mô hình gợi ý.'
      ],
      isCore: true
    },
    {
      id: 'lec-207',
      number: 207,
      titleEn: 'Amazon Textract: Extract Text, Tables & Forms from Scanned Documents',
      titleVi: 'Amazon Textract: Trích xuất Chữ, Bảng biểu & Biểu mẫu từ Tài liệu Quét Scan',
      duration: '9m',
      summaryEn: 'Amazon Textract is a machine learning service that automatically extracts printed text, handwriting, and structured data (such as forms and tables) from scanned documents. It goes far beyond simple optical character recognition (OCR) by understanding document layout and relationships.',
      summaryVi: 'Amazon Textract là dịch vụ Machine Learning tự động trích xuất chữ in, chữ viết tay và dữ liệu có cấu trúc (như bảng biểu và biểu mẫu) từ tài liệu quét scan hoặc PDF. Dịch vụ vượt xa công nghệ OCR thông thường nhờ khả năng thấu hiểu bố cục và mối quan hệ dữ liệu trong tài liệu.',
      keyPointsEn: [
        'Core Function: ML service that extracts text, handwriting, forms, and tables from scanned documents and PDFs.',
        'Beyond Traditional OCR: Traditional OCR outputs simple unformatted text strings; Textract understands document structure, maintaining table columns/rows and key-value pairs.',
        'Form Extraction (Key-Value Pairs): Automatically identifies form fields and their values (e.g., detects "Full Name: [John Doe]" and stores it as structured data without human template mapping).',
        'Table Extraction: Preserves table hierarchies, rows, columns, and cell relationships so financial spreadsheets or medical records can be directly loaded into databases.',
        'Queries Feature: Use natural language questions to pinpoint exact information inside documents (e.g., "What is the total invoice amount?" ➡️ "$4,250.00").',
        'Identity Documents & Invoices: Specialized APIs for processing passports, driver licenses, receipts, and invoices (Textract AnalyzeID and AnalyzeExpense).',
        'Document Formats: Supports JPEG, PNG, TIFF, and multi-page PDF documents.',
        'Security & Compliance: HIPAA eligible and PCI DSS compliant for processing sensitive financial and medical documents.'
      ],
      keyPointsVi: [
        'Chức năng cốt lõi: Dịch vụ Machine Learning trích xuất chữ in, chữ viết tay, biểu mẫu và bảng biểu từ tài liệu quét scan và file PDF.',
        'Vượt trội hơn OCR truyền thống: Công nghệ OCR cũ chỉ đọc ra một chuỗi chữ lộn xộn; Textract hiểu được bố cục tài liệu, giữ nguyên hàng cột của bảng và các cặp key-value.',
        'Bóc tách biểu mẫu (Key-Value Pairs): Tự động phát hiện trường dữ liệu và giá trị tương ứng (ví dụ: nhận biết "Họ và tên: [Nguyễn Văn A]" mà không cần lập trình viên phải vẽ mẫu trước).',
        'Trích xuất bảng biểu (Table Extraction): Giữ nguyên vẹn cấu trúc bảng biểu, hàng, cột, ô dữ liệu giúp đưa trực tiếp vào Excel hoặc cơ sở dữ liệu quan hệ.',
        'Tính năng Textract Queries: Đặt câu hỏi bằng ngôn ngữ tự nhiên để lấy ngay con số cần thiết (ví dụ: "Tổng tiền hóa đơn là bao nhiêu?" ➡️ "$4,250.00").',
        'Xử lý giấy tờ tùy thân & Hóa đơn: Tích hợp sẵn API chuyên dụng AnalyzeID (đọc hộ chiếu, bằng lái xe) và AnalyzeExpense (đọc hóa đơn VAT, biên lai chi phí).',
        'Định dạng tệp hỗ trợ: Hỗ trợ ảnh định dạng JPEG, PNG, TIFF và tài liệu PDF nhiều trang.',
        'Chuẩn bảo mật nghiêm ngặt: Đạt chứng nhận HIPAA và PCI DSS cho phép xử lý các tài liệu y tế và hồ sơ tài chính nhạy cảm.'
      ],
      table: {
        headers: ['Đặc điểm kỹ thuật', 'Amazon Textract', 'OCR truyền thống thông thường'],
        rows: [
          ['Đọc bảng biểu (Tables)', 'Giữ nguyên cấu trúc dòng, cột, ô (Row, Column, Cell)', 'Chữ trong các ô bị dính liền thành một đoạn văn lộn xộn'],
          ['Đọc biểu mẫu (Forms)', 'Tự động nhận diện cặp Khóa - Giá trị (Key-Value pairs)', 'Không hiểu được nhãn nào tương ứng với ô nhập liệu nào'],
          ['Đọc chữ viết tay (Handwriting)', 'Có hỗ trợ nhận diện chữ viết tay nhờ Deep Learning', 'Chỉ đọc được chữ in rõ ràng, hay sai chữ viết tay'],
          ['Đặt câu hỏi trích xuất', 'Hỗ trợ tính năng Textract Queries', 'Không hỗ trợ'],
          ['Từ khóa đề thi CLF-C02', '"Extract text and tables from scanned PDFs", "Forms key-values"', '"Simple text extraction"']
        ]
      },
      examTipsEn: [
        'Keyword Alert: "Extract text, forms, or tables from scanned documents or PDFs", "process invoices and receipts", "beyond traditional OCR" = Amazon Textract.',
        'Textract vs Rekognition: Rekognition analyzes IMAGES/VIDEOS for objects/faces/moderation. Textract extracts STRUCTURED DATA from DOCUMENTS/PDFs.',
        'Common Architecture: Invoices uploaded to S3 ➡️ Lambda triggers Textract ➡️ Form data saved to Amazon DynamoDB.'
      ],
      examTipsVi: [
        'Dấu hiệu nhận biết: "Extract text, forms, or tables from scanned documents or PDFs" (trích xuất chữ, biểu mẫu, bảng từ tài liệu scan), "process invoices and receipts" (xử lý hóa đơn), "beyond traditional OCR" = CHỌN Amazon Textract.',
        'Phân biệt Textract và Rekognition: Rekognition phân tích ẢNH/VIDEO để tìm người/đồ vật/khuôn mặt. Textract trích xuất DỮ LIỆU CÓ CẤU TRÚC từ TÀI LIỆU/PDF.',
        'Kiến trúc đề thi hay gặp: Khách tải hóa đơn lên S3 ➡️ Lambda kích hoạt Textract bóc tách thông tin ➡️ Lưu số tiền và ngày tháng vào DynamoDB.'
      ],
      isCore: true
    },
    {
      id: 'lec-208',
      number: 208,
      titleEn: 'Machine Learning Summary & Exam Cheat Sheet (Service-to-Capability Matrix)',
      titleVi: 'Tổng kết Chuyên đề Machine Learning & Ma trận Tra cứu Nhanh Đề thi',
      duration: '15m',
      summaryEn: 'Comprehensive summary and cheat sheet for all 11 AWS Machine Learning services. Master the "1 Service = 1 Definition" rule, multi-service exam architecture patterns, and the definitive decision matrix for achieving 100% on Domain 3 ML questions.',
      summaryVi: 'Bản tổng kết toàn diện và bộ bảng tra cứu nhanh cho toàn bộ 11 dịch vụ Machine Learning trên AWS. Nắm vững nguyên tắc vàng "1 Dịch vụ = 1 Định nghĩa duy nhất", các mô hình kiến trúc kết hợp đa dịch vụ và ma trận trúng tủ đề thi để đạt điểm số tuyệt đối trong Domain 3.',
      keyPointsEn: [
        'The "1 Service = 1 Definition" Rule: Match keywords directly to the corresponding AWS service without second-guessing.',
        'Rekognition: Vision (images & video: objects, people, faces, celebrities, content moderation).',
        'Transcribe: Speech-to-Text (converts spoken audio to text, PII redaction, subtitles).',
        'Polly: Text-to-Speech (reads text aloud into lifelike audio voices, audiobooks, SSML, lexicons).',
        'Translate: Language Translation (translates text between languages, custom terminology).',
        'Lex: Conversational Chatbots (powers Alexa technology, ASR + NLU, voice and text bots).',
        'Connect: Cloud Contact Center (virtual customer care center, phone routing, IVR).',
        'Comprehend: Natural Language Processing (NLP: sentiment analysis, entity extraction, topics).',
        'SageMaker: Custom ML Models (build, train, tune, deploy models for data scientists).',
        'Kendra: Enterprise Document Search (natural language search across internal corporate knowledge bases).',
        'Personalize: Real-time Recommendations (personalized product suggestions, Amazon.com technology).',
        'Textract: Document Text & Tables (extracts text, forms with key-values, and tables from scanned PDFs).'
      ],
      keyPointsVi: [
        'Nguyên tắc vàng "1 Dịch vụ = 1 Định nghĩa": Bắt từ khóa là chọn ngay đáp án chính xác trong vòng 5 giây.',
        'Rekognition: Thị giác máy tính (nhận diện đồ vật, khuôn mặt, người nổi tiếng, kiểm duyệt ảnh/video nhạy cảm).',
        'Transcribe: Giọng nói thành văn bản (chuyển âm thanh thành chữ, làm mờ thông tin cá nhân PII, tạo phụ đề).',
        'Polly: Văn bản thành giọng nói (đọc văn bản thành file âm thanh tự nhiên, sách nói, thẻ SSML, từ điển phát âm).',
        'Translate: Dịch thuật ngôn ngữ (dịch văn bản giữa các ngôn ngữ, tùy chỉnh bảng thuật ngữ riêng).',
        'Lex: Chatbot đàm thoại (công nghệ của Alexa, nhận diện ý định giọng nói/văn bản, kết nối Lambda).',
        'Connect: Tổng đài ảo trên mây (hệ thống chăm sóc khách hàng qua điện thoại, phân luồng cuộc gọi, IVR).',
        'Comprehend: Xử lý ngôn ngữ tự nhiên (NLP, phân tích cảm xúc khen/chê, trích xuất thực thể, phân cụm chủ đề).',
        'SageMaker: Tự xây mô hình ML riêng (nền tảng hoàn chỉnh cho Data Scientist xây dựng, huấn luyện, triển khai mô hình tùy chỉnh).',
        'Kendra: Tìm kiếm tài liệu doanh nghiệp (tìm kiếm bằng câu hỏi tự nhiên trong kho tri thức nội bộ công ty).',
        'Personalize: Gợi ý cá nhân hóa (động cơ gợi ý sản phẩm thời gian thực, công nghệ của trang Amazon.com).',
        'Textract: Đọc chữ & bảng biểu từ tài liệu (bóc tách biểu mẫu key-value và bảng biểu từ file PDF/ảnh quét scan).'
      ],
      table: {
        headers: ['Dịch vụ AWS (Service)', 'Từ khóa định nghĩa chính (Key Trigger)', 'Dữ liệu đầu vào (Input)', 'Kết quả đầu ra (Output)'],
        rows: [
          ['Amazon Rekognition', 'Image & Video analysis, Faces, Moderation', 'Ảnh (JPEG/PNG), Video (S3/Kinesis)', 'Nhãn vật thể, tọa độ mặt, cờ cảnh báo nhạy cảm'],
          ['Amazon Transcribe', 'Speech-to-Text, Subtitles, PII Redaction', 'File âm thanh (MP3, WAV) hoặc Audio stream', 'File văn bản lời thoại có dấu thời gian (Transcript)'],
          ['Amazon Polly', 'Text-to-Speech, Lifelike voices, Audiobooks', 'Đoạn văn bản (Plain text hoặc SSML)', 'File âm thanh giọng đọc (MP3, OGG, PCM)'],
          ['Amazon Translate', 'Language translation, Fluent multilingual', 'Văn bản ngôn ngữ nguồn', 'Văn bản đã dịch sang ngôn ngữ đích'],
          ['Amazon Lex', 'Conversational AI, Chatbots, Alexa engine', 'Câu chat chữ hoặc giọng nói của người dùng', 'Nhận diện Intent, lấy Slot, gọi Lambda fulfillment'],
          ['Amazon Connect', 'Cloud Contact Center, Virtual PBX, Call routing', 'Cuộc gọi điện thoại của khách hàng', 'Phân luồng cuộc gọi, kết nối nhân viên tư vấn'],
          ['Amazon Comprehend', 'NLP, Sentiment analysis, Entity extraction', 'Văn bản phi cấu trúc (Reviews, Emails)', 'Điểm cảm xúc (Positive/Negative), danh sách thực thể'],
          ['Amazon SageMaker', 'Build, train, deploy CUSTOM ML models', 'Dữ liệu thô cho Data Scientists huấn luyện', 'Mô hình ML tùy chỉnh triển khai trên Endpoint'],
          ['Amazon Kendra', 'Intelligent enterprise search, Natural queries', 'Tài liệu công ty (SharePoint, S3, Salesforce)', 'Đoạn trích câu trả lời chính xác cho câu hỏi'],
          ['Amazon Personalize', 'Personalized recommendations, Amazon.com tech', 'Lịch sử tương tác người dùng (Clicks, Purchases)', 'Danh sách sản phẩm gợi ý cá nhân hóa thời gian thực'],
          ['Amazon Textract', 'Extract text, forms, tables from scanned PDFs', 'File tài liệu quét scan, PDF, ảnh hóa đơn', 'Dữ liệu có cấu trúc (Cặp Key-Value, Bảng dòng-cột)']
        ]
      },
      examTipsEn: [
        'Multi-Service Exam Pattern 1: A global company wants to translate customer calls into text, translate to English, and analyze sentiment ➡️ Amazon Transcribe (Speech-to-text) + Amazon Translate (English translation) + Amazon Comprehend (Sentiment analysis).',
        'Multi-Service Exam Pattern 2: A healthcare provider wants to extract patient records from scanned paper forms and identify medical conditions ➡️ Amazon Textract (Extract forms & tables) + Amazon Comprehend Medical (Analyze medical conditions).',
        'Multi-Service Exam Pattern 3: An automated call center system where a caller talks to a phone bot to check order status ➡️ Amazon Connect (Contact center) + Amazon Lex (Conversational chatbot) + AWS Lambda (Lookup order in database).'
      ],
      examTipsVi: [
        'Mô hình đề thi kinh điển 1: Công ty muốn ghi lại cuộc gọi khách hàng, dịch sang tiếng Anh và đánh giá mức độ hài lòng ➡️ Amazon Transcribe (ghi âm thành chữ) + Amazon Translate (dịch sang tiếng Anh) + Amazon Comprehend (đo cảm xúc tích cực/tiêu cực).',
        'Mô hình đề thi kinh điển 2: Phòng khám muốn quét hồ sơ bệnh án dạng giấy để trích xuất thông tin và tìm chẩn đoán y khoa ➡️ Amazon Textract (đọc biểu mẫu và bảng biểu từ file scan) + Amazon Comprehend Medical (phân tích bệnh lý và đơn thuốc).',
        'Mô hình đề thi kinh điển 3: Tổng đài tự động tiếp nhận cuộc gọi, khách nói chuyện với bot để kiểm tra tình trạng đơn hàng ➡️ Amazon Connect (tổng đài ảo) + Amazon Lex (bot đàm thoại hiểu giọng nói) + AWS Lambda (truy vấn đơn hàng trong CSDL).'
      ],
      isCore: true
    }
  ]
};
