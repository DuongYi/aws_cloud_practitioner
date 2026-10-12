import { SectionItem } from '../../types';

export const PART2_SECTIONS: SectionItem[] = [
  {
    id: 'section-9',
    sectionNumber: 9,
    titleEn: 'Databases & Analytics',
    titleVi: 'Cơ sở dữ liệu & Phân tích (Databases & Analytics)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Database Core',
    overviewEn: 'Section 9 covers AWS database and analytics services and, for the exam, which one fits which use case.',
    overviewVi: 'Section 9 học các dịch vụ database và phân tích của AWS và, cho kỳ thi, dịch vụ nào phù hợp với trường hợp nào.',
    quickExamFacts: [
      {
        en: 'RDS/Aurora = managed relational (OLTP, SQL). Read Replicas scale reads (up to 15); Multi-AZ = failover (standby is passive); Multi-Region = DR and low local latency (cross-Region transfer cost). Aurora: 5x MySQL / 3x Postgres, up to 256 TB, ~20% pricier; Aurora Serverless for unpredictable workloads.',
        vi: 'RDS/Aurora = relational được quản lý (OLTP, SQL). Read Replica mở rộng đọc (tối đa 15); Multi-AZ = failover (bản chờ thụ động); Multi-Region = DR và độ trễ cục bộ thấp. Aurora: 5x MySQL / 3x Postgres, tới 256 TB, đắt hơn ~20%; Aurora Serverless cho workload khó đoán.',
        isCoreHighlight: true
      },
      {
        en: 'ElastiCache = in-memory (Redis/Memcached). DynamoDB = serverless NoSQL key-value, single-digit ms; DAX = microsecond cache only for DynamoDB; Global Tables = active-active multi-Region.',
        vi: 'ElastiCache = trong bộ nhớ (Redis/Memcached). DynamoDB = NoSQL key-value serverless, vài ms; DAX = cache micro giây chỉ cho DynamoDB; Global Table = active-active nhiều Region.',
        isCoreHighlight: true
      },
      {
        en: 'Redshift = OLAP data warehouse (columnar, MPP). Athena = serverless SQL on S3 (~$5/TB scanned). EMR = Hadoop. QuickSight = BI dashboards. Glue = serverless ETL. DMS = migration (homogeneous or heterogeneous).',
        vi: 'Redshift = data warehouse OLAP (dạng cột, MPP). Athena = SQL serverless trên S3 (~5 USD/TB quét). EMR = Hadoop. QuickSight = dashboard BI. Glue = ETL serverless. DMS = di chuyển (đồng nhất hoặc không đồng nhất).',
        isCoreHighlight: true
      },
      {
        en: 'DocumentDB = MongoDB; Neptune = graph; Timestream = time series; Managed Blockchain = Hyperledger Fabric / Ethereum.',
        vi: 'DocumentDB = MongoDB; Neptune = graph; Timestream = chuỗi thời gian; Managed Blockchain = Hyperledger Fabric / Ethereum.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-90',
        number: 90,
        titleEn: 'Databases Introduction',
        titleVi: 'Giới thiệu về Cơ sở dữ liệu (Relational vs NoSQL)',
        summaryEn: 'Why databases vs file storage; structured data, indexes, relationships. Relational databases (SQL) vs NoSQL databases (flexible JSON schema, horizontal scaling). Managed database benefits.',
        summaryVi: 'Vì sao dùng database thay vì lưu trữ thông thường, và các loại database chính (quan hệ SQL vs NoSQL). Trách nhiệm chia sẻ khi dùng database được quản lý.',
        table: {
          headers: ['Đặc điểm so sánh', 'Relational Databases (SQL)', 'NoSQL Databases'],
          rows: [
            ['Cấu trúc dữ liệu', 'Bảng tính có hàng và cột, liên kết qua khóa ngoại', 'Mô hình dữ liệu cụ thể (key-value, document, graph), schema linh hoạt'],
            ['Ngôn ngữ truy vấn', 'SQL (Structured Query Language)', 'API / SDK chuyên biệt theo loại cơ sở dữ liệu'],
            ['Khả năng mở rộng', 'Chủ yếu mở rộng dọc (Vertical Scalability - nâng cấp CPU/RAM)', 'Mở rộng ngang dễ dàng (Horizontal Scalability - thêm nhiều máy chủ phân tán)'],
            ['Định dạng phổ biến', 'Bảng quan hệ (RDBMS)', 'Tài liệu JSON, cặp key-value, đồ thị liên kết'],
            ['Dịch vụ AWS tiêu biểu', 'Amazon RDS, Amazon Aurora', 'Amazon DynamoDB, Amazon DocumentDB, Amazon Neptune']
          ]
        },
        keyPointsEn: [
          'Databases store structured data, create indexes for fast search, and define relationships.',
          'Relational: tables with links, queried with SQL (e.g. students and departments).',
          'NoSQL (Not Only SQL): non-relational, flexible schema (JSON), scales horizontally, optimized for specific models.',
          'Managed databases: automated provisioning, OS patching, backups, point-in-time restore, high availability, and scaling handled by AWS.'
        ],
        keyPointsVi: [
          'Database lưu trữ dữ liệu có cấu trúc, đánh chỉ mục (index) giúp tìm kiếm siêu nhanh và quản lý quan hệ.',
          'Relational (quan hệ): bảng có liên kết với nhau, truy vấn bằng SQL (nghe SQL -> nghĩ đến Relational).',
          'NoSQL (phi quan hệ): schema linh hoạt, dữ liệu thường ở dạng JSON, mở rộng ngang bằng cách thêm nhiều server phân tán.',
          'Database được quản lý: AWS lo cung cấp phần cứng, vá lỗi OS, sao lưu tự động và phục hồi lỗi.'
        ]
      },
      {
        id: 'lec-91',
        number: 91,
        titleEn: 'RDS & Aurora Overview',
        titleVi: 'Tổng quan Amazon RDS & Amazon Aurora',
        summaryEn: 'RDS is the managed SQL database service (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, DB2, Aurora). Aurora is AWS cloud-native relational database (5x MySQL / 3x Postgres performance).',
        summaryVi: 'RDS là dịch vụ CSDL quan hệ được quản lý. Aurora là CSDL cloud-native độc quyền của AWS tương thích MySQL/Postgres với hiệu năng vượt trội.',
        table: {
          headers: ['Tiêu chí', 'Amazon RDS', 'Amazon Aurora'],
          rows: [
            ['Bản chất', 'Chạy các engine mã nguồn mở & thương mại có sẵn', 'Công nghệ CSDL độc quyền do AWS phát triển, tối ưu cho cloud'],
            ['Engine hỗ trợ', 'PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, IBM DB2', 'Tương thích hoàn toàn với PostgreSQL và MySQL'],
            ['Hiệu năng', 'Hiệu năng chuẩn của engine', 'Nhanh gấp 5 lần MySQL và 3 lần PostgreSQL trên RDS'],
            ['Dung lượng lưu trữ', 'Cấp phát trước dung lượng EBS (tùy chọn autoscaling)', 'Tự động tăng theo bước 10 GB, tối đa lên tới 256 TB'],
            ['Chi phí', 'Giá tiêu chuẩn', 'Đắt hơn RDS khoảng 20% nhưng hiệu quả hơn'],
            ['Điều không thể làm', 'Không thể SSH vào hệ điều hành máy chủ RDS', 'Không thể SSH vào hệ điều hành máy chủ Aurora']
          ]
        },
        keyPointsEn: [
          'RDS provides automated provisioning, OS patching, continuous backups with point-in-time restore, read replicas, and Multi-AZ.',
          'Cannot SSH into RDS instances.',
          'Aurora: cloud-optimized, 5x performance over MySQL, 3x over Postgres; storage grows automatically up to 256 TB.',
          'Aurora Serverless: automated instantiation and auto-scaling based on actual usage; pay per second; ideal for intermittent or unpredictable workloads.'
        ],
        keyPointsVi: [
          'RDS tự động cung cấp, vá lỗi hệ điều hành, sao lưu liên tục, khôi phục theo thời điểm (point-in-time restore).',
          'Điều duy nhất không thể làm trên RDS: Không thể SSH vào hệ điều hành của instance.',
          'Aurora: công nghệ do AWS tạo ra, nhanh gấp 5 lần MySQL và 3 lần Postgres trên RDS; dung lượng tự mở rộng tới 256 TB.',
          'Aurora Serverless: tự động co giãn theo mức dùng thực tế, trả tiền theo giây, lý tưởng cho khối lượng công việc ngắt quãng hoặc khó đoán.'
        ],
        isCore: true
      },
      {
        id: 'lec-92',
        number: 92,
        titleEn: 'RDS Hands On',
        titleVi: 'Thực hành tạo RDS MySQL, Snapshot & Dọn dẹp',
        summaryEn: 'Create RDS MySQL instance on Free tier, explore endpoint, port 3306, security groups, take a snapshot, and delete resources safely.',
        summaryVi: 'Tạo database RDS MySQL ở free tier, khám phá endpoint, cổng 3306, security group demo-rds, chụp snapshot và dọn dẹp an toàn.',
        keyPointsEn: [
          'Templates: Free Tier allows single-AZ deployment; Production template enables Multi-AZ deployments.',
          'Public access: requires endpoint + port 3306 in security group inbound rules.',
          'Snapshots: can restore into a new DB, copy to another Region for disaster recovery, or share across accounts.',
          'Cleanup: delete database without final snapshot to avoid charges.'
        ],
        keyPointsVi: [
          'Template: Free Tier chỉ cho phép Single-AZ (1 instance); template Production cho phép Multi-AZ có bản standby.',
          'Kết nối: ứng dụng kết nối qua Endpoint và cổng (MySQL là cổng 3306), cần mở cổng trong Security Group.',
          'Snapshot: chụp bản sao lưu thủ công, có thể khôi phục thành DB mới, copy sang Region khác (DR) hoặc chia sẻ.',
          'Dọn dẹp: xóa snapshot và xóa database, chọn không tạo final snapshot.'
        ]
      },
      {
        id: 'lec-93',
        number: 93,
        titleEn: 'RDS Deployments Options',
        titleVi: 'Các lựa chọn kiến trúc RDS: Read Replicas vs Multi-AZ vs Multi-Region',
        summaryEn: 'Detailed comparison of Read Replicas (scaling reads up to 15), Multi-AZ (high availability failover, passive standby), and Multi-Region (DR and global latency).',
        summaryVi: 'So sánh chi tiết 3 lựa chọn kiến trúc: Read Replicas (mở rộng đọc tới 15 bản), Multi-AZ (dự phòng nóng failover khi mất AZ) và Multi-Region (phục hồi thảm họa toàn cầu).',
        table: {
          headers: ['Lựa chọn kiến trúc', 'Mục đích chính', 'Cơ chế hoạt động & Điểm thi then chốt'],
          rows: [
            ['Read Replicas', 'Mở rộng khối lượng ĐỌC (Scale reads)', 'Tối đa 15 bản sao chỉ đọc. Ứng dụng ĐỌC từ replicas; lệnh GHI chỉ đi vào database chính'],
            ['Multi-AZ', 'Sẵn sàng cao & Tự động phục hồi lỗi (Failover)', 'Bản sao chờ (standby) ở AZ KHÁC. Bản chờ hoàn toàn THỤ ĐỘNG và không truy cập được cho đến khi failover tự động xảy ra'],
            ['Multi-Region (Read Replicas)', 'Phục hồi thảm họa (DR) & Giảm độ trễ cục bộ', 'Read replica ở Region khác. Đọc cục bộ nhanh; ghi về Region chính. Chi phí: phí truyền dữ liệu giữa các Region']
          ]
        },
        keyPointsEn: [
          'Read Replicas: scale read workload (up to 15). Writes go only to main RDS database.',
          'Multi-AZ: high availability / failover. Standby is passive and not accessible until failover is triggered. Only one standby AZ.',
          'Multi-Region: disaster recovery and lower local latency; incurred cross-Region data transfer charges.'
        ],
        keyPointsVi: [
          'Read Replicas: mở rộng tải đọc (tối đa 15 bản). Ứng dụng đọc từ replica, ghi chỉ vào database chính.',
          'Multi-AZ: tính sẵn sàng cao và failover. Bản sao standby ở AZ khác hoàn toàn thụ động (passive), không truy cập đọc/ghi được cho đến khi có sự cố.',
          'Multi-Region: phục hồi thảm họa và giảm độ trễ cho người dùng toàn cầu; có phát sinh phí truyền dữ liệu giữa các Region.'
        ],
        isCore: true
      },
      {
        id: 'lec-94',
        number: 94,
        titleEn: 'ElastiCache Overview',
        titleVi: 'Tổng quan Amazon ElastiCache (In-memory Caching: Redis vs Memcached)',
        summaryEn: 'Managed Redis or Memcached in-memory databases providing sub-millisecond latency to offload read-intensive workloads from relational databases.',
        summaryVi: 'Dịch vụ Redis hoặc Memcached được quản lý, lưu trữ trong bộ nhớ RAM, mang lại độ trễ dưới mili-giây giúp giảm tải đọc cho CSDL chính.',
        table: {
          headers: ['Tính năng so sánh', 'Amazon ElastiCache for Redis', 'Amazon ElastiCache for Memcached'],
          rows: [
            ['Kiểu dữ liệu hỗ trợ', 'Đa dạng: Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps', 'Chỉ hỗ trợ chuỗi đơn giản Key-Value thuần túy'],
            ['Tính sẵn sàng & Multi-AZ', 'Hỗ trợ Multi-AZ với tính năng tự động chuyển đổi dự phòng (Auto-failover)', 'Không có Multi-AZ (chia cụm phân mảnh sharding thuần túy)'],
            ['Bản sao đọc (Read Replicas)', 'Hỗ trợ bản sao đọc để mở rộng đọc và nâng cao tính sẵn sàng', 'Không hỗ trợ bản sao đọc'],
            ['Lưu trữ bền vững (Persistence)', 'Có hỗ trợ sao lưu dự phòng và phục hồi (Snapshots/AOF)', 'Không lưu bền vững (mất điện/khởi động lại là mất trắng dữ liệu cache)'],
            ['Trường hợp sử dụng điển hình', 'Bảng xếp hạng (Leaderboards), Session store phức tạp, Pub/Sub, Cache nâng cao', 'Bộ nhớ đệm đối tượng đơn giản (Pure object cache), giảm tải DB căn bản']
          ]
        },
        keyPointsEn: [
          'In-memory databases with extreme performance and sub-millisecond latency.',
          'Exam keyword: whenever you see "in-memory database" or "in-memory cache" -> think ElastiCache.',
          'Reduces load on RDS databases for read-intensive workloads by serving repetitive queries from RAM.',
          'Redis: supports Multi-AZ, read replicas, complex data structures, and persistence/snapshots.',
          'Memcached: multi-threaded, pure object caching, no persistence or Multi-AZ.',
          'Fully managed by AWS: OS patching, maintenance, setup, monitoring, failure recovery, backups.'
        ],
        keyPointsVi: [
          'Cơ sở dữ liệu trong bộ nhớ (In-memory) với hiệu năng cực cao và độ trễ dưới mili-giây.',
          'Từ khóa vàng trong đề thi: thấy "in-memory database" hoặc "in-memory cache" -> chọn ngay ElastiCache.',
          'Giúp giảm áp lực cho database RDS trong các ứng dụng đọc nhiều (read-heavy): truy vấn lặp lại được lấy từ cache.',
          'Redis: hỗ trợ Multi-AZ, Read Replicas, cấu trúc dữ liệu phức tạp và có sao lưu snapshot.',
          'Memcached: đa luồng (multi-threaded), bộ đệm đối tượng thuần túy, không có snapshot hay Multi-AZ.',
          'AWS quản lý toàn bộ: vá lỗi hệ điều hành, cấu hình, giám sát và phục hồi lỗi tự động.'
        ],
        isCore: true
      },
      {
        id: 'lec-95',
        number: 95,
        titleEn: 'DynamoDB Overview',
        titleVi: 'Tổng quan Amazon DynamoDB & DAX',
        summaryEn: 'Fully managed, serverless NoSQL key-value database replicated across 3 AZs. Single-digit millisecond latency. DynamoDB Accelerator (DAX) drops latency to microseconds.',
        summaryVi: 'CSDL NoSQL key-value serverless được quản lý hoàn toàn, sao chép qua 3 AZ. Độ trễ vài mili-giây. DAX giúp giảm độ trễ xuống micro-giây.',
        table: {
          headers: ['Tính năng', 'Amazon DynamoDB', 'DynamoDB Accelerator (DAX)'],
          rows: [
            ['Bản chất', 'CSDL NoSQL key-value serverless', 'Bộ nhớ đệm (in-memory cache) dành riêng cho DynamoDB'],
            ['Độ trễ', 'Vài mili-giây (single-digit millisecond latency)', 'Micro-giây (microsecond latency) - nhanh gấp 10 lần'],
            ['Khả năng mở rộng', 'Hàng triệu request/giây, hàng trăm TB dữ liệu', 'Tự động mở rộng cụm cache'],
            ['Khác biệt với ElastiCache', 'Lưu trữ dữ liệu vĩnh viễn', 'DAX chỉ dành riêng và tích hợp trực tiếp với DynamoDB']
          ]
        },
        keyPointsEn: [
          'Serverless: no servers or instance types to provision; scales to millions of requests/sec and trillions of rows.',
          'Fast and consistent performance: single-digit millisecond latency.',
          'Data model: key-value database (partition key and optional sort key).',
          'Table classes: Standard and Infrequent Access (IA).',
          'DAX (DynamoDB Accelerator): fully managed in-memory cache exclusively for DynamoDB, delivering microsecond latency.'
        ],
        keyPointsVi: [
          'Serverless: không cần quản lý máy chủ hay chọn loại instance; tự co giãn tới hàng triệu request/giây.',
          'Hiệu năng ổn định: độ trễ một chữ số mili-giây (single-digit millisecond latency).',
          'Mô hình dữ liệu: Key-Value (gồm partition key và thuộc tính).',
          'DAX (DynamoDB Accelerator): bộ đệm trong bộ nhớ dành riêng cho DynamoDB, đưa độ trễ từ mili-giây xuống micro-giây.'
        ],
        isCore: true
      },
      {
        id: 'lec-96',
        number: 96,
        titleEn: 'DynamoDB Hands On',
        titleVi: 'Thực hành tạo bảng DynamoDB & Schema linh hoạt',
        summaryEn: 'Hands on: create DemoTable with partition key user_id, add items with different attributes (flexible schema), observe that no JOINs exist.',
        summaryVi: 'Thực hành tạo bảng DemoTable với partition key user_id, thêm các item có thuộc tính khác nhau (schema linh hoạt), quan sát cấu trúc không có JOIN.',
        keyPointsEn: [
          'Create table without creating a database: serverless benefit.',
          'Flexible schema: item 1 can have user_id, first_name, last_name, favorite_number; item 2 can have only user_id and first_name.',
          'All data lives in a single table; no JOIN operations across tables (NoSQL design).'
        ],
        keyPointsVi: [
          'Tạo bảng trực tiếp mà không cần tạo máy chủ CSDL: ưu điểm vượt trội của mô hình serverless.',
          'Schema linh hoạt: mỗi hàng (item) có thể có các trường thuộc tính khác nhau mà không cần sửa cấu trúc bảng.',
          'Dữ liệu nằm trọn vẹn trong một bảng duy nhất, không có thao tác JOIN giữa các bảng như SQL.'
        ]
      },
      {
        id: 'lec-97',
        number: 97,
        titleEn: 'DynamoDB Global Tables',
        titleVi: 'DynamoDB Global Tables (Sao chép đa vùng Active-Active)',
        summaryEn: 'Global Tables provide low-latency access across multiple Regions (1 to 10 Regions) with two-way active-active replication.',
        summaryVi: 'Global Tables cung cấp khả năng truy cập độ trễ thấp trên nhiều Region (từ 1 đến 10 Region) với cơ chế sao chép hai chiều Active-Active.',
        keyPointsEn: [
          'Bi-directional (two-way) replication across multiple Regions.',
          'Users can read and write in ANY Region; changes replicate automatically to all others.',
          'Active-Active replication model across 1 to 10 Regions for global disaster recovery and minimal latency.'
        ],
        keyPointsVi: [
          'Sao chép hai chiều (bi-directional replication) giữa các bảng ở nhiều Region khác nhau.',
          'Người dùng có thể ĐỌC VÀ GHI ở BẤT KỲ Region nào; thay đổi được đồng bộ tự động sang các Region còn lại.',
          'Mô hình Active-Active từ 1 đến 10 Region giúp phục hồi thảm họa và tối ưu độ trễ cho người dùng quốc tế.'
        ],
        isCore: true
      },
      {
        id: 'lec-98',
        number: 98,
        titleEn: 'Redshift Overview',
        titleVi: 'Tổng quan Amazon Redshift (OLAP Data Warehouse)',
        summaryEn: 'Amazon Redshift is an OLAP data warehouse for analytics. Columnar storage, Massively Parallel Processing (MPP), petabyte scale, Redshift Serverless.',
        summaryVi: 'Amazon Redshift là kho dữ liệu (data warehouse) chuyên cho phân tích OLAP. Lưu trữ dạng cột (columnar), kiến trúc MPP xử lý song song, quy mô petabyte.',
        table: {
          headers: ['Tiêu chí', 'Amazon RDS (OLTP)', 'Amazon Redshift (OLAP)'],
          rows: [
            ['Mục đích sử dụng', 'Online Transaction Processing (Xử lý giao dịch trực tuyến)', 'Online Analytical Processing (Xử lý phân tích dữ liệu trực tuyến)'],
            ['Kiểu dữ liệu & Lưu trữ', 'Lưu trữ theo hàng (Row-based)', 'Lưu trữ theo cột (Columnar storage)'],
            ['Kiểu truy vấn', 'Giao dịch liên tục, ghi/sửa từng bản ghi', 'Truy vấn tổng hợp phức tạp (SUM, AVG) trên hàng triệu dòng'],
            ['Quy mô', 'Gigabytes đến Terabytes', 'Terabytes đến Petabytes'],
            ['Tần suất nạp dữ liệu', 'Nạp liên tục theo thời gian thực', 'Nạp theo đợt (batch), ví dụ mỗi giờ hoặc mỗi ngày']
          ]
        },
        keyPointsEn: [
          'OLTP = RDS (transactions). OLAP = Redshift (data warehouse / analytics).',
          'Columnar storage: data stored by column, 10x better performance for analytical queries.',
          'MPP (Massively Parallel Query Execution) engine.',
          'Redshift Serverless: run analytics without provisioning warehouse infrastructure; pay only for compute/storage used.'
        ],
        keyPointsVi: [
          'Phân biệt thi: OLTP (giao dịch) -> RDS; OLAP (kho dữ liệu phân tích / data warehouse) -> Redshift.',
          'Lưu trữ theo cột (Columnar storage): thấy từ khóa "columnar" -> nghĩ ngay đến Redshift.',
          'Engine MPP: thực thi truy vấn song song quy mô lớn trên nhiều node tính toán.',
          'Redshift Serverless: phân tích dữ liệu không cần quản trị máy chủ, tự động mở rộng dung lượng theo câu truy vấn.'
        ],
        isCore: true
      },
      {
        id: 'lec-99',
        number: 99,
        titleEn: 'EMR Overview',
        titleVi: 'Tổng quan Amazon EMR (Cụm Hadoop & Xử lý Big Data)',
        summaryEn: 'EMR (Elastic MapReduce) provisions and configures Hadoop clusters (Spark, HBase, Presto, Flink) across hundreds of EC2 instances for big data processing.',
        summaryVi: 'Amazon EMR khởi tạo và quản lý cụm Hadoop (Spark, HBase, Presto, Flink) trên hàng trăm máy ảo EC2 để xử lý và phân tích lượng dữ liệu khổng lồ.',
        keyPointsEn: [
          'Hadoop cluster on AWS used to analyze and process vast amounts of data.',
          'Ecosystem includes: Apache Spark, HBase, Presto, Flink.',
          'EMR provisions and configures all EC2 instances so they work together seamlessly.',
          'Supports Auto Scaling and integrates with Spot instances for massive cost savings.',
          'Exam keyword: whenever you see "Hadoop cluster" -> think Amazon EMR.'
        ],
        keyPointsVi: [
          'Cụm Hadoop trên AWS dùng để phân tích và xử lý khối lượng dữ liệu khổng lồ (Big Data).',
          'Hệ sinh thái mã nguồn mở: Apache Spark, HBase, Presto, Flink.',
          'EMR tự động cấp phát và cấu hình hàng trăm máy ảo EC2 phối hợp làm việc cùng nhau.',
          'Hỗ trợ Auto Scaling và tích hợp máy ảo Spot để tiết kiệm chi phí tối đa.',
          'Từ khóa đề thi: Thấy "Hadoop cluster" -> chọn ngay Amazon EMR.'
        ],
        isCore: true
      },
      {
        id: 'lec-100',
        number: 100,
        titleEn: 'Athena Overview',
        titleVi: 'Tổng quan Amazon Athena (Truy vấn SQL Serverless trên S3)',
        summaryEn: 'Serverless interactive query service to analyze data directly in Amazon S3 using standard SQL. Pay per data scanned (~$5 per TB).',
        summaryVi: 'Dịch vụ truy vấn serverless phân tích dữ liệu trực tiếp trong Amazon S3 bằng ngôn ngữ SQL chuẩn. Trả tiền theo dung lượng dữ liệu được quét (~$5/TB).',
        table: {
          headers: ['Tiêu chí', 'Amazon Athena', 'Amazon Redshift', 'Amazon EMR'],
          rows: [
            ['Kiến trúc máy chủ', 'Serverless 100%, không cần tạo cụm máy chủ', 'Kho dữ liệu cụm cluster (hoặc Redshift Serverless)', 'Cụm máy chủ EC2 quản lý chạy Hadoop/Spark'],
            ['Vị trí dữ liệu', 'Trực tiếp trong Amazon S3 (không cần nạp trước)', 'Nạp dữ liệu vào các bảng Redshift (hoặc qua Redshift Spectrum)', 'HDFS trên cụm máy chủ hoặc đọc từ Amazon S3 (EMRFS)'],
            ['Mô hình tính giá', 'Chỉ trả tiền theo dung lượng quét (~$5/TB)', 'Trả tiền theo giờ cho cluster (node) hoặc RPU serverless', 'Trả tiền theo giờ máy ảo EC2 + phí bản quyền EMR'],
            ['Trường hợp phù hợp', 'Truy vấn ad-hoc nhanh, phân tích log S3 (VPC, CloudTrail)', 'Báo cáo BI doanh nghiệp phức tạp, phân tích dữ liệu lớn định kỳ', 'Xử lý dữ liệu lớn Big Data cực lớn bằng mã code Spark, Python, Scala']
          ]
        },
        keyPointsEn: [
          'Query files in S3 using standard SQL without loading them into a database first.',
          'Supported formats: CSV, JSON, ORC, Avro, Parquet (built on Presto engine).',
          'Pricing: ~$5 per TB of data scanned (compressing or using columnar formats like Parquet saves cost).',
          'Common use cases: querying VPC Flow Logs, CloudTrail logs, and ELB access logs in S3.',
          'Exam keyword: "serverless analytics on data in S3 using SQL" -> Amazon Athena.'
        ],
        keyPointsVi: [
          'Dùng SQL tiêu chuẩn truy vấn trực tiếp các tệp lưu trong S3 mà không cần nạp vào CSDL trước.',
          'Hỗ trợ nhiều định dạng: CSV, JSON, ORC, Avro, Parquet (xây dựng trên engine Presto).',
          'Giá cước: khoảng 5 USD cho mỗi TB dữ liệu được quét (dùng định dạng nén/cột như Parquet giúp tiết kiệm chi phí).',
          'Ứng dụng phổ biến: phân tích log hệ thống AWS (VPC Flow Logs, CloudTrail logs, ELB logs).',
          'Từ khóa thi: "phân tích dữ liệu trong S3 bằng SQL không cần server" -> chọn Amazon Athena.'
        ],
        isCore: true
      },
      {
        id: 'lec-101',
        number: 101,
        titleEn: 'QuickSight Overview',
        titleVi: 'Tổng quan Amazon QuickSight (Business Intelligence & Dashboards)',
        summaryEn: 'Serverless, ML-powered business intelligence (BI) service to build interactive dashboards and data visualizations with per-session pricing.',
        summaryVi: 'Dịch vụ Business Intelligence (BI) serverless tích hợp machine learning để tạo biểu đồ và dashboard tương tác, tính phí theo phiên sử dụng.',
        keyPointsEn: [
          'Build interactive dashboards and visualizations for business users.',
          'Serverless, automatically scalable, embeddable, with per-session pricing.',
          'Integrates seamlessly with RDS, Aurora, Athena, Redshift, and Amazon S3.',
          'Exam keyword: "interactive dashboards", "BI tool" -> Amazon QuickSight.'
        ],
        keyPointsVi: [
          'Tạo báo cáo và dashboard tương tác trực quan hóa dữ liệu cho người dùng doanh nghiệp.',
          'Serverless, tự động mở rộng quy mô, có thể nhúng vào ứng dụng web, tính phí theo phiên (per-session).',
          'Kết nối mượt mà với RDS, Aurora, Athena, Redshift và Amazon S3.',
          'Từ khóa thi: "dashboard tương tác", "công cụ BI" -> chọn Amazon QuickSight.'
        ]
      },
      {
        id: 'lec-102',
        number: 102,
        titleEn: 'DocumentDB Overview',
        titleVi: 'Tổng quan Amazon DocumentDB (Tương thích MongoDB)',
        summaryEn: 'DocumentDB is the Aurora equivalent for MongoDB: fully managed NoSQL JSON document database replicated across 3 AZs.',
        summaryVi: 'Amazon DocumentDB là phiên bản tương đương Aurora dành cho MongoDB: CSDL tài liệu NoSQL JSON được quản lý hoàn toàn, sao chép qua 3 AZ.',
        keyPointsEn: [
          'Aurora equivalent for MongoDB: cloud-native managed JSON document database.',
          'Fully managed, highly available: data replicated across 3 Availability Zones.',
          'Storage grows automatically in 10 GB increments up to 64 TB / 256 TB.',
          'Scales to workloads with millions of requests per second.',
          'Exam keyword: "MongoDB" or "JSON document database" -> DocumentDB.'
        ],
        keyPointsVi: [
          'Bản Aurora cho MongoDB: CSDL tài liệu JSON NoSQL được tối ưu cho nền tảng đám mây.',
          'Được quản lý hoàn toàn, sẵn sàng cao: dữ liệu tự động sao chép qua 3 Availability Zones.',
          'Dung lượng tự động tăng theo từng bước 10 GB.',
          'Khả năng mở rộng cho khối lượng công việc hàng triệu request/giây.',
          'Từ khóa thi: "MongoDB", "NoSQL document database" -> chọn Amazon DocumentDB.'
        ],
        isCore: true
      },
      {
        id: 'lec-103',
        number: 103,
        titleEn: 'Neptune Overview',
        titleVi: 'Tổng quan Amazon Neptune (Graph Database)',
        summaryEn: 'Fully managed graph database built for highly connected datasets (social networks, knowledge graphs, fraud detection).',
        summaryVi: 'Cơ sở dữ liệu đồ thị (Graph Database) được quản lý hoàn toàn, chuyên xử lý các tập dữ liệu có mối quan hệ liên kết phức tạp.',
        keyPointsEn: [
          'Graph database: optimized for complex queries on highly connected datasets.',
          'Examples: social networks (users, friends, posts, likes), knowledge graphs (Wikipedia), fraud detection, recommendation engines.',
          'Stores billions of relations and queries with millisecond latency; replicated across 3 AZs with up to 15 read replicas.',
          'Exam keyword: "graph database", "social network connections", "fraud detection graph" -> Amazon Neptune.'
        ],
        keyPointsVi: [
          'CSDL đồ thị: tối ưu cho các truy vấn phức tạp trên tập dữ liệu có liên kết chặt chẽ.',
          'Ví dụ: mạng xã hội (bạn bè, bài viết, lượt thích), sơ đồ tri thức (Wikipedia), phát hiện gian lận tài chính.',
          'Lưu trữ hàng tỷ mối quan hệ và truy vấn với độ trễ mili-giây; sao chép qua 3 AZ với tối đa 15 read replica.',
          'Từ khóa thi: "graph database", "mối quan hệ mạng xã hội" -> chọn ngay Amazon Neptune.'
        ],
        isCore: true
      },
      {
        id: 'lec-104',
        number: 104,
        titleEn: 'Timestream Overview',
        titleVi: 'Tổng quan Amazon Timestream (Time Series Database)',
        summaryEn: 'Fully managed, serverless time series database for IoT and operational data that changes over time. 1000x faster at 1/10th the cost of relational DBs.',
        summaryVi: 'Cơ sở dữ liệu chuỗi thời gian serverless được quản lý hoàn toàn cho dữ liệu IoT và vận hành biến đổi theo thời gian. Nhanh hơn 1.000 lần và chi phí bằng 1/10 CSDL quan hệ.',
        keyPointsEn: [
          'Time series data: data points indexed and plotted against time (e.g. IoT sensor readings, stock prices, server metrics).',
          'Automatically scales up and down based on compute needs; analyzes trillions of events per day.',
          'Built-in time series analytics functions.',
          'Exam keyword: "time series data", "IoT metric tracking over time" -> Amazon Timestream.'
        ],
        keyPointsVi: [
          'Dữ liệu chuỗi thời gian (Time series): dữ liệu ghi nhận theo trình tự thời gian (chỉ số cảm biến IoT, giá cổ phiếu, thông số máy chủ).',
          'Tự động co giãn theo dung lượng; lưu trữ và phân tích hàng nghìn tỷ sự kiện mỗi ngày.',
          'Nhanh hơn 1.000 lần với chi phí chỉ bằng 1/10 so với CSDL quan hệ cho loại dữ liệu này.',
          'Từ khóa thi: "time series data", "chuỗi thời gian" -> chọn Amazon Timestream.'
        ],
        isCore: true
      },
      {
        id: 'lec-105',
        number: 105,
        titleEn: 'Managed Blockchain Overview',
        titleVi: 'Tổng quan Amazon Managed Blockchain',
        summaryEn: 'Managed service to join public blockchain networks or create scalable private decentralized networks. Supports Hyperledger Fabric and Ethereum.',
        summaryVi: 'Dịch vụ quản lý mạng blockchain công khai hoặc tạo mạng blockchain riêng tư phi tập trung. Tương thích Hyperledger Fabric và Ethereum.',
        keyPointsEn: [
          'Blockchain: decentralized execution of transactions across multiple parties without a central authority.',
          'Compatible with two frameworks: Hyperledger Fabric and Ethereum.',
          'Exam keyword: "blockchain", "Hyperledger Fabric", "Ethereum" -> Amazon Managed Blockchain.'
        ],
        keyPointsVi: [
          'Blockchain: thực thi giao dịch phi tập trung giữa nhiều bên mà không cần cơ quan trung ương kiểm soát.',
          'Tương thích 2 framework chính: Hyperledger Fabric và Ethereum.',
          'Từ khóa thi: Thấy "blockchain", "Hyperledger Fabric", "Ethereum" -> chọn Amazon Managed Blockchain.'
        ]
      },
      {
        id: 'lec-106',
        number: 106,
        titleEn: 'Glue Overview',
        titleVi: 'Tổng quan AWS Glue (Serverless ETL & Data Catalog)',
        summaryEn: 'Fully managed, serverless ETL (Extract, Transform, Load) service to prepare and transform data for analytics. Includes Glue Data Catalog.',
        summaryVi: 'Dịch vụ ETL (Trích xuất, Chuyển đổi, Nạp) hoàn toàn serverless để chuẩn bị và làm sạch dữ liệu trước khi phân tích. Bao gồm Glue Data Catalog.',
        table: {
          headers: ['Tiêu chí so sánh', 'AWS Glue (ETL)', 'AWS DMS (Migration)'],
          rows: [
            ['Mục tiêu chính', 'Trích xuất, biến đổi, làm sạch dữ liệu để phục vụ phân tích (Analytics)', 'Di chuyển cơ sở dữ liệu lên AWS an toàn, không gián đoạn hoạt động'],
            ['Loại hình xử lý', 'ETL (Extract - Transform - Load), chuyển đổi schema phức tạp', 'CDC (Change Data Capture) đồng bộ dữ liệu liên tục giữa 2 DB'],
            ['Đích đến thông thường', 'Data Lake (S3), Data Warehouse (Amazon Redshift)', 'Amazon RDS, Amazon Aurora, DynamoDB, hoặc DocumentDB'],
            ['Tính chất hạ tầng', 'Hoàn toàn Serverless', 'Yêu cầu Replication Instance chạy máy ảo trung gian']
          ]
        },
        keyPointsEn: [
          'ETL (Extract, Transform, Load): extracts data from sources (S3, RDS), transforms/cleans it, loads into data warehouses (Redshift).',
          'Fully serverless: no servers to manage.',
          'Glue Data Catalog: central metadata repository of column names, types, and schemas used by Athena, Redshift, and EMR.',
          'Exam keyword: "ETL", "extract transform load", "data preparation" -> AWS Glue.'
        ],
        keyPointsVi: [
          'ETL (Trích xuất, Chuyển đổi, Nạp dữ liệu): lấy dữ liệu từ S3/RDS, viết script chuẩn hóa dữ liệu rồi nạp vào Redshift để phân tích.',
          'Hoàn toàn serverless: không cần quản trị máy chủ.',
          'Glue Data Catalog: danh mục siêu dữ liệu tập trung (tên cột, kiểu dữ liệu, schema) cho Athena, Redshift và EMR sử dụng.',
          'Từ khóa thi: Thấy "ETL", "extract transform load" -> chọn ngay AWS Glue.'
        ],
        isCore: true
      },
      {
        id: 'lec-107',
        number: 107,
        titleEn: 'DMS Overview',
        titleVi: 'Tổng quan AWS DMS (Database Migration Service)',
        summaryEn: 'Database Migration Service moves data from source to target databases quickly and securely. Source database remains available during migration.',
        summaryVi: 'Dịch vụ di chuyển cơ sở dữ liệu lên AWS an toàn và nhanh chóng. Cơ sở dữ liệu nguồn vẫn hoạt động bình thường trong suốt quá trình chuyển giao.',
        table: {
          headers: ['Loại di chuyển', 'Định nghĩa', 'Ví dụ'],
          rows: [
            ['Homogeneous Migration (Đồng nhất)', 'Nguồn và đích dùng CÙNG một loại database engine', 'Oracle sang Oracle trên AWS, hoặc MySQL sang MySQL trên RDS'],
            ['Heterogeneous Migration (Không đồng nhất)', 'Nguồn và đích dùng HAI loại database engine KHÁC NHAU', 'Microsoft SQL Server sang Amazon Aurora (DMS tự chuyển đổi dữ liệu)']
          ]
        },
        keyPointsEn: [
          'Quick and secure database migration to AWS.',
          'Source database remains completely available and operational during migration.',
          'Supports homogeneous migrations (Oracle to Oracle) and heterogeneous migrations (SQL Server to Aurora).',
          'Exam keyword: "database migration", "migrate database to AWS with zero downtime" -> AWS DMS.'
        ],
        keyPointsVi: [
          'Di chuyển CSDL lên AWS nhanh chóng, an toàn và có khả năng tự phục hồi lỗi.',
          'CSDL nguồn vẫn hoạt động bình thường và phục vụ người dùng trong lúc di chuyển.',
          'Hỗ trợ di chuyển đồng nhất (cùng engine) và không đồng nhất (khác engine, tự chuyển đổi cấu trúc).',
          'Từ khóa thi: Thấy "database migration", "di chuyển CSDL" -> chọn ngay AWS DMS.'
        ],
        isCore: true
      },
      {
        id: 'lec-108',
        number: 108,
        titleEn: 'Databases & Analytics Summary',
        titleVi: 'Bảng tra cứu quyết định dịch vụ CSDL & Analytics',
        summaryEn: 'Comprehensive decision matrix matching exam scenario keywords directly to the correct AWS database or analytics service.',
        summaryVi: 'Bảng tra cứu quyết định nhanh ghép nối chính xác từ khóa đề thi với dịch vụ CSDL hoặc Analytics tương ứng.',
        table: {
          headers: ['Nếu câu hỏi đề cập...', 'Dịch vụ AWS cần chọn ngay'],
          rows: [
            ['CSDL quan hệ (Relational), OLTP, SQL', 'Amazon RDS hoặc Amazon Aurora'],
            ['CSDL trong bộ nhớ (In-memory database / cache)', 'Amazon ElastiCache'],
            ['CSDL NoSQL key-value, serverless, độ trễ vài ms', 'Amazon DynamoDB'],
            ['Bộ đệm cache micro-giây dành riêng cho DynamoDB', 'DynamoDB Accelerator (DAX)'],
            ['Kho dữ liệu (Data warehouse), OLAP, lưu trữ theo cột (Columnar)', 'Amazon Redshift'],
            ['Cụm Hadoop, xử lý Big Data, Spark', 'Amazon EMR'],
            ['Truy vấn tệp trong S3 bằng SQL, serverless', 'Amazon Athena'],
            ['Báo cáo biểu đồ tương tác, Business Intelligence (BI)', 'Amazon QuickSight'],
            ['Tương thích MongoDB, CSDL tài liệu JSON NoSQL', 'Amazon DocumentDB'],
            ['Mạng blockchain, Hyperledger Fabric, Ethereum', 'Amazon Managed Blockchain'],
            ['Trích xuất, chuyển đổi và nạp dữ liệu (ETL serverless)', 'AWS Glue'],
            ['Di chuyển CSDL lên AWS (Database Migration)', 'AWS Database Migration Service (DMS)'],
            ['CSDL đồ thị (Graph database), mạng xã hội, phát hiện gian lận', 'Amazon Neptune'],
            ['CSDL chuỗi thời gian (Time series database), dữ liệu IoT theo thời gian', 'Amazon Timestream']
          ]
        },
        keyPointsEn: [
          'Relational / OLTP / SQL -> RDS and Aurora.',
          'In-memory cache -> ElastiCache; Cache for DynamoDB -> DAX.',
          'Serverless key-value NoSQL -> DynamoDB; MongoDB -> DocumentDB.',
          'Data warehouse / OLAP / Columnar -> Redshift; SQL on S3 -> Athena.',
          'Hadoop / Spark -> EMR; BI dashboards -> QuickSight.',
          'ETL -> Glue; DB Migration -> DMS; Graph -> Neptune; Time series -> Timestream.'
        ],
        keyPointsVi: [
          'Quan hệ / OLTP / SQL -> RDS và Aurora.',
          'Cache in-memory -> ElastiCache; Cache riêng cho DynamoDB -> DAX.',
          'NoSQL key-value serverless -> DynamoDB; MongoDB -> DocumentDB.',
          'Kho dữ liệu OLAP dạng cột -> Redshift; Truy vấn SQL trên S3 -> Athena.',
          'Cụm Hadoop -> EMR; Báo cáo BI -> QuickSight.',
          'ETL -> Glue; Di chuyển CSDL -> DMS; Đồ thị -> Neptune; Chuỗi thời gian -> Timestream.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-10',
    sectionNumber: 10,
    titleEn: 'Other Compute: Containers & Serverless (ECS, Fargate, Lambda, Batch & Lightsail)',
    titleVi: 'Điện toán khác: Containers, Serverless, Batch & Lightsail',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Serverless & Containers',
    overviewEn: 'Section 10 covers containers (Docker, ECS, Fargate, ECR, EKS), serverless (Lambda, API Gateway), and Batch and Lightsail services.',
    overviewVi: 'Section 10 học toàn diện về container (Docker, ECS, Fargate, ECR, EKS), serverless (Lambda, API Gateway), cùng các dịch vụ Batch và Lightsail.',
    quickExamFacts: [
      {
        en: 'Run Docker containers on AWS -> ECS (you provision and manage EC2) or Fargate (serverless, no EC2 to manage). Images stored in ECR. Kubernetes -> EKS.',
        vi: 'Chạy Docker container trên AWS -> ECS (bạn tự cấp và quản lý EC2) hoặc Fargate (serverless, không quản lý EC2). Image lưu ở ECR. Thấy từ khóa Kubernetes -> chọn ngay EKS.',
        isCoreHighlight: true
      },
      {
        en: 'Lambda: serverless functions (FaaS), event-driven, max 15 minutes, billed by invocations and duration x memory. Free tier: 1M requests & 400,000 GB-seconds per month. Not for arbitrary Docker images (use ECS/Fargate).',
        vi: 'Lambda: hàm serverless (FaaS), chạy theo sự kiện, tối đa 15 phút, tính tiền theo số lần gọi và thời lượng x bộ nhớ. Free tier: 1 triệu request và 400.000 GB-giây/tháng. Không chạy Docker image tùy ý (dùng ECS/Fargate).',
        isCoreHighlight: true
      },
      {
        en: 'API Gateway + Lambda = serverless API (REST and WebSocket with security, user auth, throttling, and API keys).',
        vi: 'API Gateway + Lambda = API serverless (hỗ trợ REST và WebSocket với bảo mật, xác thực người dùng, throttling và API key).',
        isCoreHighlight: true
      },
      {
        en: 'Batch: jobs with a start and end, no time limit, runs Docker images on managed EC2/Spot instances (managed, not serverless).',
        vi: 'Batch: job có điểm bắt đầu và kết thúc, không giới hạn thời gian chạy, chạy Docker image trên cụm EC2/Spot do AWS quản lý (không serverless).',
        isCoreHighlight: true
      },
      {
        en: 'Lightsail: simple, low-cost bundle (server, storage, DB, network) for users with no cloud experience; usually an exam distractor.',
        vi: 'Lightsail: gói đơn giản, giá thấp trọn gói cho người chưa có kinh nghiệm cloud; thường là đáp án gây nhiễu (distractor) trong kỳ thi.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-109',
        number: 109,
        titleEn: 'What is Docker?',
        titleVi: 'Docker là gì? (Container vs Virtual Machine)',
        summaryEn: 'Docker is a software development platform that packages applications and dependencies into standardized, lightweight containers that run identically on any operating system.',
        summaryVi: 'Docker là nền tảng đóng gói ứng dụng cùng mọi thư viện phụ thuộc vào container chuẩn hóa, chạy đồng nhất trên mọi hệ điều hành mà không lo lỗi tương thích.',
        table: {
          headers: ['Tiêu chí so sánh', 'Máy ảo truyền thống (EC2 / VMs)', 'Docker Container'],
          rows: [
            ['Kiến trúc hệ thống', 'Hạ tầng -> Host OS -> Hypervisor -> Mỗi VM có Guest OS riêng', 'Hạ tầng -> Host OS -> Docker Daemon -> Các container dùng chung nhân Kernel'],
            ['Tốc độ khởi động', 'Vài phút (phải khởi động toàn bộ hệ điều hành khách)', 'Vài giây (chỉ khởi chạy tiến trình ứng dụng)'],
            ['Mức tiêu thụ tài nguyên', 'Nặng nề, tốn nhiều CPU và RAM cho hệ điều hành', 'Cực kỳ nhẹ, tối ưu tài nguyên, chạy được hàng chục container trên 1 EC2'],
            ['Mức độ cô lập', 'Cô lập cấp phần cứng (Hardware-level isolation)', 'Cô lập cấp tiến trình (Process-level isolation)'],
            ['Tính di động', 'Phụ thuộc vào cấu hình hypervisor và image máy ảo', 'Chạy đồng nhất trên bất kỳ môi trường nào (laptop, dev, test, AWS production)']
          ]
        },
        keyPointsEn: [
          'Docker packages applications into containers: runs the same way anywhere without compatibility issues.',
          'Containers scale up and down in seconds; multiple containers can run on a single EC2 instance.',
          'Docker images are stored in repositories: Docker Hub (public) and Amazon ECR (private on AWS).',
          'Containers share the host OS kernel, making them much more lightweight and efficient than full VMs.'
        ],
        keyPointsVi: [
          'Docker đóng gói ứng dụng vào container: chạy giống nhau ở mọi nơi, không gặp lỗi môi trường.',
          'Container co giãn lên xuống chỉ trong vài giây; một máy ảo EC2 có thể chạy đồng thời nhiều container.',
          'Docker image lưu trong repository: Docker Hub (công khai) và Amazon ECR (kho riêng tư trên AWS).',
          'Container dùng chung nhân hệ điều hành của host, nhẹ hơn và tận dụng tài nguyên tốt hơn nhiều so với máy ảo.'
        ]
      },
      {
        id: 'lec-110',
        number: 110,
        titleEn: 'ECS, Fargate & ECR Overview',
        titleVi: 'Tổng quan Amazon ECS, AWS Fargate & Amazon ECR',
        summaryEn: 'How to run Docker containers on AWS: ECS (on EC2 instances you provision), Fargate (serverless container compute, no EC2 to manage), and ECR (private image registry).',
        summaryVi: 'Cách chạy Docker container trên AWS: ECS (trên máy ảo EC2 bạn tự quản), Fargate (serverless không cần quản lý máy chủ), và ECR (kho lưu Docker image riêng).',
        table: {
          headers: ['Đặc điểm so sánh', 'Amazon ECS on EC2', 'AWS Fargate (Serverless Containers)'],
          rows: [
            ['Quản lý hạ tầng', 'Bạn phải tự cấp phát, cấu hình và bảo trì các máy ảo EC2', 'Hoàn toàn Serverless: không có máy ảo EC2 nào để tạo hay quản trị'],
            ['Cấp phát tài nguyên', 'Quản lý CPU, RAM và dung lượng đĩa của từng instance EC2', 'Chỉ cần chỉ định lượng CPU và RAM mong muốn cho từng task/container'],
            ['Mức độ kiểm soát', 'Toàn quyền SSH và can thiệp sâu vào hệ điều hành máy chủ', 'AWS tự điều phối và chạy ngầm; người dùng không cần và không thể SSH'],
            ['Mô hình chi phí', 'Trả tiền theo giờ máy ảo EC2 dù container có đang bận hay rảnh', 'Chỉ trả tiền theo lượng vCPU và RAM thực tế mà container sử dụng theo giây'],
            ['Mức độ đơn giản', 'Phức tạp hơn, cần quản lý cập nhật OS và vá lỗi bảo mật', 'Đơn giản hơn rất nhiều, lý tưởng cho đội ngũ tập trung vào mã nguồn ứng dụng']
          ]
        },
        keyPointsEn: [
          'ECS (Elastic Container Service): launches Docker containers on EC2 instances you provision beforehand.',
          'ECS integrates with Application Load Balancer to distribute traffic to containers.',
          'AWS Fargate: serverless container compute. No EC2 instances to provision or manage. You specify CPU and RAM, AWS runs the container.',
          'Amazon ECR (Elastic Container Registry): private Docker image repository on AWS where you store images for ECS and Fargate.',
          'Exam keyword: "Run Docker on AWS without managing servers" -> AWS Fargate.'
        ],
        keyPointsVi: [
          'Amazon ECS: khởi chạy Docker container trên các máy ảo EC2 do bạn tự cung cấp trước.',
          'ECS tích hợp mượt mà với Application Load Balancer để chia tải cho các container bên trong.',
          'AWS Fargate: nền tảng container serverless. Không cần tạo hay quản lý máy ảo EC2; chỉ cần khai báo CPU và RAM.',
          'Amazon ECR: kho lưu trữ Docker image riêng tư trên AWS, cung cấp image cho ECS và Fargate kéo về chạy.',
          'Từ khóa đề thi: "Chạy Docker trên AWS không muốn quản lý máy chủ" -> chọn ngay AWS Fargate.'
        ],
        isCore: true
      },
      {
        id: 'lec-111',
        number: 111,
        titleEn: 'Amazon EKS (Elastic Kubernetes Service)',
        titleVi: 'Amazon EKS (Dịch vụ Kubernetes được quản lý)',
        summaryEn: 'Amazon EKS manages Kubernetes clusters on AWS. Kubernetes is the open-source industry standard for container orchestration, cloud-agnostic across AWS, GCP, Azure, and on-premises.',
        summaryVi: 'Amazon EKS khởi chạy và quản lý cụm Kubernetes trên AWS. Kubernetes là chuẩn mã nguồn mở điều phối container đa nền tảng (AWS, GCP, Azure, on-premises).',
        table: {
          headers: ['Tiêu chí so sánh', 'Amazon ECS', 'Amazon EKS (Kubernetes)'],
          rows: [
            ['Bản chất công nghệ', 'Công nghệ điều phối container độc quyền do chính AWS phát triển', 'Mã nguồn mở Kubernetes chuẩn công nghiệp do Cloud Native Computing Foundation quản lý'],
            ['Độ phức tạp', 'Dễ học, cấu hình nhanh chóng, tích hợp sâu vào AWS ecosystem', 'Phức tạp hơn, yêu cầu kiến thức chuyên sâu về Kubernetes (Pods, Services, Ingress)'],
            ['Tính di động đa đám mây', 'Chỉ chạy trên nền tảng AWS (và ECS Anywhere)', 'Hoàn toàn không phụ thuộc cloud (Cloud-agnostic): dùng chung ở AWS, Azure, GCP, on-prem'],
            ['Nền tảng Worker Node', 'Chạy được trên EC2 instances hoặc AWS Fargate serverless', 'Chạy được trên EC2 instances hoặc AWS Fargate serverless']
          ]
        },
        keyPointsEn: [
          'Kubernetes is an open-source container orchestration system for deploying, managing, and scaling containers.',
          'EKS nodes/pods can run on managed EC2 instances or on AWS Fargate for a serverless setup.',
          'Why Kubernetes: cloud-agnostic, skills carry over to other clouds and on-premises environments.',
          'Exam keyword: whenever you see the word "Kubernetes" -> think Amazon EKS.'
        ],
        keyPointsVi: [
          'Kubernetes là hệ thống mã nguồn mở điều phối, tự động hóa triển khai và mở rộng container quy mô lớn.',
          'Node/Pod của EKS có thể chạy trên máy ảo EC2 hoặc trên AWS Fargate serverless.',
          'Ưu điểm lớn nhất của Kubernetes: không phụ thuộc nhà cung cấp cloud (cloud-agnostic), kiến thức dùng được ở mọi nơi.',
          'Từ khóa vàng trong đề thi: thấy chữ "Kubernetes" -> chọn ngay Amazon EKS.'
        ],
        isCore: true
      },
      {
        id: 'lec-112',
        number: 112,
        titleEn: 'Serverless Introduction',
        titleVi: 'Giới thiệu mô hình kiến trúc Serverless',
        summaryEn: 'Serverless is a paradigm where developers do not manage servers; they deploy code and functions. Does not mean no servers exist, but users do not provision, patch, or see them.',
        summaryVi: 'Serverless là mô hình lập trình viên không còn quản lý máy chủ; chỉ tập trung vào mã nguồn. Vẫn có máy chủ ngầm nhưng AWS tự quản lý và ẩn hoàn toàn.',
        table: {
          headers: ['Phân loại dịch vụ', 'Dịch vụ Serverless tiêu biểu trên AWS', 'Đặc điểm tự động hóa'],
          rows: [
            ['Tính toán (Compute)', 'AWS Lambda, AWS Fargate', 'Chỉ chạy khi có yêu cầu, co giãn từ 0 đến hàng nghìn tiến trình trong giây'],
            ['Lưu trữ (Storage)', 'Amazon S3, Amazon EFS (Serverless mode)', 'Dung lượng vô hạn, không cần cấp phát trước kích thước ổ đĩa'],
            ['Cơ sở dữ liệu (Database)', 'Amazon DynamoDB, Amazon Aurora Serverless', 'Tự động mở rộng dung lượng và thông lượng theo lưu lượng truy cập thực tế'],
            ['Tích hợp & API', 'Amazon API Gateway, Amazon EventBridge, SQS, SNS', 'Định tuyến thông điệp và sự kiện theo thời gian thực không cần máy chủ proxy']
          ]
        },
        keyPointsEn: [
          'Serverless started as Function as a Service (FaaS) with AWS Lambda.',
          'Serverless today encompasses compute, databases, messaging, and storage services.',
          'Serverless does NOT mean there are no servers: AWS manages provisioning, OS patching, scaling, and high availability behind the scenes.',
          'Developers focus 100% on business code instead of infrastructure management.'
        ],
        keyPointsVi: [
          'Serverless khởi đầu với mô hình Function as a Service (FaaS) thông qua dịch vụ AWS Lambda.',
          'Ngày nay Serverless bao gồm cả tính toán, cơ sở dữ liệu, hàng đợi thông điệp và lưu trữ.',
          'Serverless KHÔNG có nghĩa là không có server: máy chủ vẫn tồn tại nhưng AWS lo toàn bộ việc cấp phát, vá lỗi, bảo mật và mở rộng.',
          'Lập trình viên tập trung 100% vào logic nghiệp vụ thay vì lo lắng về hạ tầng máy chủ.'
        ]
      },
      {
        id: 'lec-113',
        number: 113,
        titleEn: 'AWS Lambda Overview',
        titleVi: 'Tổng quan AWS Lambda (Serverless Function as a Service)',
        summaryEn: 'Virtual functions running on demand in the cloud. Event-driven, automated seamless scaling, maximum 15-minute runtime, pay only for calls and execution duration.',
        summaryVi: 'Hàm ảo thực thi theo yêu cầu trên đám mây. Hoạt động theo sự kiện, tự động co giãn tức thì, thời gian chạy tối đa 15 phút, tính tiền theo số lần gọi và thời lượng.',
        table: {
          headers: ['Tiêu chí so sánh', 'Amazon EC2', 'AWS Lambda'],
          rows: [
            ['Bản chất', 'Máy chủ ảo chạy liên tục trên đám mây', 'Hàm ảo (Virtual functions), không có máy chủ để quản lý'],
            ['Thời gian sống', 'Chạy 24/7 liên tục kể cả khi không có người dùng', 'Chạy theo yêu cầu (on-demand), tự tắt khi xong việc'],
            ['Giới hạn thực thi', 'Chạy vô hạn thời gian tùy ý', 'Thời gian chạy tối đa 15 phút cho mỗi lần gọi (invocation)'],
            ['Cơ chế mở rộng', 'Cần cấu hình Auto Scaling Group (mất vài phút để khởi động máy mới)', 'Tự động co giãn liền mạch (seamless scaling) từ 1 đến hàng nghìn hàm trong tích tắc'],
            ['Mô hình tính tiền', 'Tính tiền liên tục theo giờ/giây dù máy chủ có đang rảnh rỗi', 'Chỉ tính tiền khi hàm chạy: dựa trên Số lần gọi + (Thời lượng x Bộ nhớ RAM)']
          ]
        },
        keyPointsEn: [
          'Virtual functions in the cloud with no servers to manage.',
          'Maximum execution duration: 15 minutes per invocation.',
          'Supported runtimes: Node.js, Python, Java, C#, PowerShell, Ruby, and custom runtimes (Go, Rust). Most common: Node.js and Python.',
          'Resource allocation: up to 10 GB of RAM per function (increasing RAM proportionately scales CPU and network).',
          'Generous Free Tier: 1 million requests and 400,000 GB-seconds of compute time per month permanently.',
          'Lambda can run container images ONLY if they implement the Lambda Runtime API. For arbitrary Docker images, choose ECS or Fargate.',
          'Popular use cases: thumbnail generation when images upload to S3, serverless CRON jobs with EventBridge.'
        ],
        keyPointsVi: [
          'Hàm ảo trên cloud, hoàn toàn không cần quản trị máy chủ.',
          'Giới hạn thời gian chạy: Tối đa 15 phút cho mỗi lần gọi hàm.',
          'Ngôn ngữ hỗ trợ: Node.js, Python, Java, C#, PowerShell, Ruby, cùng custom runtime. Phổ biến nhất là Node.js và Python.',
          'Cấp phát tài nguyên: tối đa 10 GB RAM cho mỗi hàm (tăng RAM sẽ tự động tăng tương ứng hiệu năng CPU và mạng).',
          'Free Tier vĩnh viễn: 1 triệu lượt gọi và 400.000 GB-giây tính toán mỗi tháng.',
          'Lambda chỉ chạy được container image nếu image đó tích hợp Lambda Runtime API. Muốn chạy Docker image tùy ý, hãy chọn ECS hoặc Fargate.',
          'Ứng dụng phổ biến: Tự động tạo ảnh thu nhỏ (thumbnail) khi có ảnh tải lên S3, chạy lịch tác vụ CRON định kỳ với EventBridge.'
        ],
        isCore: true
      },
      {
        id: 'lec-114',
        number: 114,
        titleEn: 'Lambda Hands On',
        titleVi: 'Thực hành tạo hàm Lambda Python, Test Event & Cấu hình Trigger',
        summaryEn: 'Console walkthrough: create a HelloWorld Python function from blueprint, examine execution role, test with JSON payload, view CloudWatch Logs, configure memory and timeout, and add S3 triggers.',
        summaryVi: 'Trải nghiệm console Lambda: tạo hàm HelloWorld Python từ blueprint, xem execution role, kiểm tra với dữ liệu test JSON, đọc log CloudWatch, chỉnh timeout và thêm trigger từ S3.',
        keyPointsEn: [
          'Execution role: an IAM role assigned to Lambda (e.g. permission to write logs to CloudWatch Logs or read from S3).',
          'Event handler function receives event payload (JSON keys) and returns response.',
          'Test events: save simulated JSON inputs in console to test function behavior and error handling.',
          'Monitoring tab integrates with CloudWatch metrics and CloudWatch Logs stream for debugging.',
          'Triggers: event sources that invoke Lambda (e.g. S3 ObjectCreated event, DynamoDB Streams, API Gateway).'
        ],
        keyPointsVi: [
          'Execution role: IAM role cấp quyền cho Lambda thực thi (ví dụ quyền ghi log vào CloudWatch Logs hoặc đọc file S3).',
          'Hàm handler nhận tham số event (dạng JSON) và trả về kết quả xử lý.',
          'Test event: lưu các mẫu dữ liệu JSON giả lập trên console để kiểm thử logic và bắt lỗi.',
          'Tab Monitor liên kết trực tiếp với CloudWatch Logs để xem chi tiết log lỗi phục vụ debug.',
          'Triggers: nguồn sự kiện kích hoạt hàm Lambda (ví dụ: sự kiện tải file lên S3, thay đổi trong DynamoDB, request từ API Gateway).'
        ]
      },
      {
        id: 'lec-115',
        number: 115,
        titleEn: 'API Gateway Overview',
        titleVi: 'Tổng quan Amazon API Gateway (Mở cổng HTTP & WebSocket Serverless)',
        summaryEn: 'Fully managed service to create, publish, maintain, monitor, and secure RESTful and WebSocket APIs at any scale. Acts as serverless front-door for Lambda and DynamoDB.',
        summaryVi: 'Dịch vụ được quản lý hoàn toàn giúp tạo, xuất bản, duy trì, giám sát và bảo mật các API RESTful và WebSocket. Đóng vai trò cửa ngõ serverless cho Lambda và DynamoDB.',
        table: {
          headers: ['Thành phần kiến trúc Serverless', 'Nhiệm vụ & Cơ chế hoạt động trong luồng gọi'],
          rows: [
            ['Client (Trình duyệt / Mobile App)', 'Gửi yêu cầu HTTP request (GET, POST, PUT, DELETE) qua Internet'],
            ['Amazon API Gateway (Cửa ngõ)', 'Xác thực người dùng, kiểm soát tốc độ (Throttling), API Keys, quản lý phiên bản, chuyển tiếp request'],
            ['AWS Lambda (Xử lý nghiệp vụ)', 'Nhận payload từ API Gateway, thực thi mã code logic, trả kết quả về cho client'],
            ['Amazon DynamoDB (Cơ sở dữ liệu)', 'Lưu trữ và truy vấn dữ liệu NoSQL với độ trễ vài mili-giây']
          ]
        },
        keyPointsEn: [
          'Exposes Lambda functions as public HTTP APIs (Client -> API Gateway -> Lambda -> DynamoDB).',
          'Fully managed, serverless, and automatically scales with incoming request volume.',
          'Supports both RESTful APIs and WebSocket APIs (for real-time two-way communication).',
          'Built-in security: user authentication (Cognito, IAM), API throttling, rate limiting, and API keys.',
          'Exam keyword: "build a serverless API" or "expose Lambda as HTTP endpoint" -> API Gateway and Lambda.'
        ],
        keyPointsVi: [
          'Mở hàm Lambda thành các điểm cuối HTTP công khai (Client -> API Gateway -> Lambda -> DynamoDB).',
          'Hoàn toàn serverless, tự động mở rộng quy mô theo lưu lượng request gọi đến.',
          'Hỗ trợ cả RESTful API tiêu chuẩn và WebSocket API (truyền thông 2 chiều thời gian thực).',
          'Tích hợp bảo mật mạnh mẽ: xác thực người dùng (Cognito, IAM), giới hạn tốc độ gọi (Throttling), quản lý API Key.',
          'Từ khóa đề thi: "xây dựng API serverless" hoặc "mở hàm Lambda thành HTTP API" -> chọn ngay Amazon API Gateway & Lambda.'
        ],
        isCore: true
      },
      {
        id: 'lec-116',
        number: 116,
        titleEn: 'AWS Batch Overview',
        titleVi: 'Tổng quan AWS Batch (Xử lý tác vụ tính toán theo lô)',
        summaryEn: 'Fully managed batch processing service that runs batch computing jobs at any scale. Automatically launches EC2 or Spot instances sized to queue length; jobs have start and end with no time limit.',
        summaryVi: 'Dịch vụ xử lý theo lô được quản lý hoàn toàn cho các công việc có điểm bắt đầu và kết thúc, không giới hạn thời gian chạy, tự động điều phối cụm EC2 hoặc Spot instance.',
        table: {
          headers: ['Tiêu chí so sánh', 'AWS Lambda', 'AWS Batch'],
          rows: [
            ['Giới hạn thời gian chạy', 'Tối đa 15 phút (không thể chạy lâu hơn)', 'KHÔNG GIỚI HẠN THỜI GIAN (chạy hàng giờ, hàng ngày tùy ý)'],
            ['Môi trường Runtime', 'Hạn chế trong các ngôn ngữ Lambda hỗ trợ hoặc container API', 'BẤT KỲ MÔI TRƯỜNG NÀO, đóng gói tự do trong Docker image'],
            ['Dung lượng lưu trữ tạm', 'Hạn chế (512 MB đến 10 GB bộ nhớ tạm)', 'Dung lượng khổng lồ dùng ổ đĩa EC2: EBS volumes hoặc Instance Store'],
            ['Bản chất hạ tầng', 'Hoàn toàn Serverless', 'KHÔNG PHẢI SERVERLESS: dịch vụ được quản lý điều phối trên các máy ảo EC2/Spot thật'],
            ['Trường hợp sử dụng điển hình', 'Xử lý sự kiện web nhanh, API, chuyển đổi ảnh nhỏ', 'Mô phỏng tài chính phức tạp, phân tích gen sinh học, xử lý video nặng theo đợt']
          ]
        },
        keyPointsEn: [
          'Batch job has a clear start and end (unlike continuous stream processing).',
          'No time limit: jobs can run for hours or days without being terminated.',
          'Job is packaged as a Docker image and runs on ECS, EKS, or Fargate.',
          'Cost optimization: automatically provisions Spot instances to save up to 90% on compute costs.',
          'Managed service, NOT serverless: provisions real EC2/Spot instances managed automatically by AWS.'
        ],
        keyPointsVi: [
          'Batch job có điểm bắt đầu và kết thúc rõ ràng (khác với xử lý luồng dữ liệu liên tục không bao giờ dừng).',
          'Không giới hạn thời gian: công việc có thể chạy liên tục nhiều giờ hoặc nhiều ngày mà không bị ngắt.',
          'Tác vụ được đóng gói thành Docker image và chạy trên hạ tầng cụm ECS, EKS hoặc Fargate.',
          'Tối ưu chi phí cực mạnh: tự động tận dụng máy ảo Spot để tiết kiệm tới 90% chi phí tính toán.',
          'Là dịch vụ được quản lý nhưng KHÔNG PHẢI SERVERLESS: hoạt động dựa trên các máy ảo EC2/Spot thật do AWS ngầm điều phối.'
        ],
        isCore: true
      },
      {
        id: 'lec-117',
        number: 117,
        titleEn: 'Amazon Lightsail Overview',
        titleVi: 'Tổng quan Amazon Lightsail (Gói đám mây đơn giản & Trọn gói giá rẻ)',
        summaryEn: 'Standalone, simplified virtual private server bundle (compute, storage, database, networking) at low, predictable fixed monthly pricing for users with no cloud experience.',
        summaryVi: 'Dịch vụ máy chủ ảo trọn gói đơn giản hóa (máy chủ, lưu trữ, CSDL, mạng) với mức giá cố định hàng tháng dự đoán được, dành cho người chưa có kinh nghiệm cloud.',
        table: {
          headers: ['Tiêu chí so sánh', 'Amazon Lightsail', 'Amazon EC2 & Hệ sinh thái AWS'],
          rows: [
            ['Đối tượng hướng tới', 'Người mới bắt đầu, không có kinh nghiệm về mạng hay đám mây', 'Kỹ sư giải pháp, lập trình viên, doanh nghiệp chuyên nghiệp'],
            ['Cấu hình mạng & hạ tầng', 'Gói gọn tất cả, ẩn toàn bộ khái niệm VPC, Subnet, Route Table phức tạp', 'Toàn quyền kiểm soát và tùy biến sâu từng thành phần VPC, Security Group, ENI'],
            ['Mô hình định giá', 'Gói giá cố định hàng tháng dự đoán được (từ $3.5/tháng)', 'Tính tiền linh hoạt theo từng tài nguyên riêng lẻ (compute, disk, IP, data transfer)'],
            ['Khả năng mở rộng', 'Có tính năng sẵn sàng cao (High Availability) nhưng KHÔNG CÓ Auto Scaling', 'Hỗ trợ Auto Scaling Groups, Elastic Load Balancing cực kỳ linh hoạt'],
            ['Vai trò trong kỳ thi', 'THƯỜNG LÀ ĐÁP ÁN GÂY NHIỄU (Distractor), hiếm khi là đáp án đúng', 'Đáp án chuẩn xác cho hầu hết các kiến trúc ứng dụng doanh nghiệp']
          ]
        },
        keyPointsEn: [
          'Bundles virtual server, storage, databases, and networking in one simplified console.',
          'Low and predictable monthly fixed pricing (plans starting around $3.50/month).',
          'Application blueprints: WordPress, LAMP, Nginx, MEAN, Node.js, Magento, Joomla.',
          'Has high availability options but NO auto scaling and limited AWS service integrations.',
          'Exam tip: if the scenario describes someone with NO CLOUD EXPERIENCE wanting a simple, low, predictable price without configuration -> Lightsail. Otherwise, it is almost always a distractor.'
        ],
        keyPointsVi: [
          'Gói gọn server ảo, lưu trữ, cơ sở dữ liệu và mạng trong một giao diện cực kỳ trực quan.',
          'Mức giá cố định hàng tháng thấp và dự đoán được (khởi điểm chỉ từ 3,5 USD/tháng).',
          'Có sẵn các blueprint ứng dụng cài sẵn: WordPress, LAMP, Nginx, Node.js, Magento, Joomla.',
          'Có tùy chọn sẵn sàng cao nhưng KHÔNG CÓ Auto Scaling và khả năng tích hợp dịch vụ AWS bị giới hạn.',
          'Mẹo thi chứng chỉ: chỉ chọn Lightsail khi đề bài nhấn mạnh người dùng KHÔNG CÓ KINH NGHIỆM CLOUD cần dựng web nhanh với giá thấp cố định không phải cấu hình gì. Trong mọi trường hợp khác, Lightsail là đáp án gây nhiễu (distractor).'
        ]
      },
      {
        id: 'lec-118',
        number: 118,
        titleEn: 'Lightsail Hands On',
        titleVi: 'Thực hành giao diện Amazon Lightsail, Cài đặt WordPress & Dọn dẹp',
        summaryEn: 'Lightsail console walkthrough: create a WordPress instance on fixed-price plan, access via browser-based SSH terminal, view simplified database/networking tabs, and delete instance to prevent charges.',
        summaryVi: 'Trải nghiệm console Lightsail: tạo máy chủ WordPress với gói giá cố định, truy cập terminal SSH ngay trên trình duyệt, xem các tab database/mạng đơn giản và xóa instance để không mất phí.',
        keyPointsEn: [
          'Lightsail has its own dedicated console separate from the main AWS Management Console.',
          'Choose blueprints: app + OS (WordPress) or OS only (Amazon Linux, Ubuntu).',
          'Fixed monthly plans: includes memory, vCPU, SSD storage, and generous data transfer allowance.',
          'Browser-based SSH: click on instance to open instant web terminal without managing local SSH keys.',
          'Cost reminder: delete instance immediately after testing so you are not billed.'
        ],
        keyPointsVi: [
          'Lightsail có giao diện console riêng biệt, hoàn toàn tách biệt khỏi AWS Management Console phức tạp thông thường.',
          'Chọn blueprint: Ứng dụng + OS (như WordPress) hoặc chỉ OS thuần (Amazon Linux, Ubuntu).',
          'Các gói cước cố định hàng tháng: bao gồm sẵn dung lượng RAM, vCPU, ổ SSD và hạn mức truyền dữ liệu.',
          'Terminal SSH ngay trên trình duyệt: bấm vào instance là mở ngay terminal mà không cần cấu hình file key trên máy tính.',
          'Lưu ý chi phí: nhớ bấm Delete instance sau khi thực hành xong để không bị phát sinh cước phí hàng tháng.'
        ]
      },
      {
        id: 'lec-119',
        number: 119,
        titleEn: 'Other Compute Summary',
        titleVi: 'Bảng tra cứu quyết định dịch vụ Điện toán khác (Master Compute Decision Matrix)',
        summaryEn: 'Comprehensive decision matrix matching exam scenario keywords directly to the correct AWS compute service: Docker, ECS, Fargate, ECR, EKS, Lambda, API Gateway, Batch, and Lightsail.',
        summaryVi: 'Bảng tra cứu quyết định nhanh ghép nối chính xác từ khóa đề thi chứng chỉ với dịch vụ điện toán AWS tương ứng: Docker, ECS, Fargate, ECR, EKS, Lambda, API Gateway, Batch và Lightsail.',
        table: {
          headers: ['Nếu đề bài thi mô tả tình huống...', 'Dịch vụ AWS bạn cần chọn ngay', 'Bản chất công nghệ'],
          rows: [
            ['Chạy Docker containers trên máy ảo EC2 do bạn tự cấp phát', 'Amazon ECS (on EC2)', 'Container Orchestration trên EC2'],
            ['Chạy Docker containers Serverless hoàn toàn không quản lý EC2', 'AWS Fargate', 'Serverless Container Compute'],
            ['Kho lưu trữ Docker image riêng tư trên nền tảng AWS', 'Amazon ECR', 'Private Docker Container Registry'],
            ['Điều phối container bằng chuẩn mã nguồn mở Kubernetes', 'Amazon EKS', 'Managed Kubernetes Service'],
            ['Chạy hàm ảo theo sự kiện, tối đa 15 phút, tính tiền theo thời lượng', 'AWS Lambda', 'Serverless Function as a Service (FaaS)'],
            ['Mở cổng HTTP REST hoặc WebSocket API công khai cho Lambda', 'Amazon API Gateway', 'Serverless API Management'],
            ['Xử lý tác vụ tính toán theo lô có bắt đầu/kết thúc, không giới hạn thời gian', 'AWS Batch', 'Managed Batch Processing on EC2/Spot'],
            ['Người chưa có kinh nghiệm cloud muốn dựng web/WordPress giá rẻ cố định', 'Amazon Lightsail', 'Simplified All-in-one Cloud Bundle']
          ]
        },
        keyPointsEn: [
          'Docker: container technology to package apps and dependencies identically.',
          'ECS: run Docker on EC2 you manage. Fargate: run Docker serverless without managing servers.',
          'ECR: private Docker registry. EKS: managed Kubernetes.',
          'Lambda: serverless FaaS, event-driven, max 15 minutes, billed on calls and duration x memory.',
          'API Gateway: exposes Lambda functions as secure HTTP/WebSocket APIs.',
          'Batch: batch computing with start/end, no time limit, runs on managed EC2/Spot.',
          'Lightsail: simple, low-cost bundle; usually an exam distractor.'
        ],
        keyPointsVi: [
          'Docker: công nghệ container đóng gói ứng dụng chạy đồng nhất ở mọi môi trường.',
          'ECS: chạy Docker trên EC2 bạn quản lý. Fargate: chạy Docker serverless không quản lý máy chủ.',
          'ECR: kho Docker riêng trên AWS. EKS: quản lý cụm Kubernetes.',
          'Lambda: FaaS serverless hướng sự kiện, tối đa 15 phút, tính tiền theo số lần gọi và thời lượng x RAM.',
          'API Gateway: mở hàm Lambda thành API HTTP/WebSocket an toàn.',
          'Batch: xử lý theo lô có điểm đầu/cuối, không giới hạn thời gian, tự điều phối EC2/Spot.',
          'Lightsail: gói đám mây đơn giản giá rẻ; thường là đáp án gây nhiễu trong kỳ thi.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-11',
    sectionNumber: 11,
    titleEn: 'Deployments & Scale: CloudFormation, Beanstalk, CI/CD & Systems Manager',
    titleVi: 'Triển khai & Quản lý Hạ tầng ở Quy mô lớn (IaC, CI/CD & SSM)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'DevOps & Management',
    overviewEn: 'Section 11 covers ways to deploy workloads on AWS and manage infrastructure at scale: CloudFormation, CDK, Elastic Beanstalk, the Code* developer suite, and Systems Manager.',
    overviewVi: 'Section 11 học các phương pháp triển khai ứng dụng và quản trị hạ tầng quy mô lớn: CloudFormation, CDK, Elastic Beanstalk, bộ dịch vụ CI/CD Code*, và Systems Manager.',
    quickExamFacts: [
      {
        en: 'CloudFormation = declarative Infrastructure as Code (IaC) in JSON/YAML, repeatable across Regions and accounts. CDK = define IaC in programming languages (TypeScript, Python, Java) compiled to CloudFormation.',
        vi: 'CloudFormation = IaC khai báo bằng JSON/YAML, tự động tạo tài nguyên theo thứ tự, lặp lại nhất quán qua nhiều Region và tài khoản. CDK = viết hạ tầng bằng ngôn ngữ lập trình rồi biên dịch thành CloudFormation.',
        isCoreHighlight: true
      },
      {
        en: 'Elastic Beanstalk = PaaS developer-centric; free service (you pay only for underlying resources); developer only supplies code; builds on CloudFormation under the hood.',
        vi: 'Elastic Beanstalk = PaaS lấy developer làm trung tâm; bản thân dịch vụ miễn phí (chỉ trả tiền tài nguyên bên dưới); developer chỉ cần cung cấp code; phía dưới dùng CloudFormation.',
        isCoreHighlight: true
      },
      {
        en: 'CI/CD pipeline: CodeCommit (Git) -> CodeBuild (build/test) -> CodeDeploy (deploy to EC2 + on-premises, hybrid) orchestrated by CodePipeline; CodeArtifact stores dependencies.',
        vi: 'Chuỗi CI/CD: CodeCommit (Git riêng) -> CodeBuild (build & test) -> CodeDeploy (triển khai lên EC2 và on-premise, hybrid) do CodePipeline điều phối; CodeArtifact lưu trữ dependency.',
        isCoreHighlight: true
      },
      {
        en: 'Systems Manager (SSM) = hybrid fleet management (patching, run command). Session Manager = browser shell with NO port 22/SSH/keys required. Parameter Store = serverless configuration and secrets (KMS encryption).',
        vi: 'Systems Manager (SSM) = quản lý đội máy chủ hybrid (vá lỗi, chạy lệnh đồng loạt). Session Manager = mở shell trên trình duyệt KHÔNG cần mở cổng 22 hay dùng khóa SSH. Parameter Store = lưu cấu hình và mật khẩu serverless.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-120',
        number: 120,
        titleEn: 'CloudFormation Overview',
        titleVi: 'Tổng quan AWS CloudFormation (Hạ tầng dưới dạng mã - IaC)',
        summaryEn: 'CloudFormation is the declarative way to outline AWS infrastructure using JSON or YAML templates. Creates resources in the correct order, enforces code review, and enables repeatable deployments.',
        summaryVi: 'CloudFormation là giải pháp khai báo hạ tầng dưới dạng mã (IaC) bằng file mẫu JSON hoặc YAML. Tạo tài nguyên đúng thứ tự, hỗ trợ code review và triển khai lặp lại nhất quán.',
        table: {
          headers: ['Lợi ích của CloudFormation', 'Mô tả chi tiết & Ý nghĩa vận hành'],
          rows: [
            ['Hạ tầng dưới dạng mã (IaC)', 'Không tạo thủ công trên console; mọi thay đổi đều được kiểm duyệt qua Git/Code Review'],
            ['Lập trình khai báo (Declarative)', 'Bạn chỉ cần khai báo "cần gì", CloudFormation tự tính toán thứ tự phụ thuộc (Dependency ordering)'],
            ['Tái sử dụng & Nhất quán', 'Cùng một template có thể tạo hàng loạt môi trường giống hệt nhau (Dev, Test, Prod) ở nhiều Region/Account'],
            ['Kiểm soát chi phí & Tiết kiệm', 'Mọi tài nguyên trong stack đều được gắn tag chung; có thể tự động xóa stack lúc 5h chiều và dựng lại lúc 8h sáng'],
            ['Trực quan hóa đồ họa', 'Tích hợp AWS Infrastructure Composer để xem sơ đồ kiến trúc và mối quan hệ giữa các tài nguyên trực quan']
          ]
        },
        keyPointsEn: [
          'Declarative programming: declare what you want; CloudFormation handles dependency order automatically.',
          'Supports almost every AWS resource; unsupported custom resources can be handled via Lambda.',
          'Reusability: deploy identical stacks across multiple AWS accounts and Regions.',
          'Infrastructure Composer (formerly Application Composer) provides visual architecture diagrams of stacks.',
          'Exam keyword: "Infrastructure as Code", "repeatable architecture across Regions/accounts" -> CloudFormation.'
        ],
        keyPointsVi: [
          'Lập trình khai báo: chỉ cần nêu rõ tài nguyên mong muốn, CloudFormation tự sắp xếp thứ tự tạo lập.',
          'Hỗ trợ hầu hết mọi dịch vụ của AWS; các tài nguyên chưa hỗ trợ có thể mở rộng bằng Custom Resources.',
          'Tính tái sử dụng: tạo bản sao hạ tầng y hệt nhau trên nhiều tài khoản và Region khác nhau.',
          'Infrastructure Composer hỗ trợ xem sơ đồ đồ họa trực quan liên kết giữa các tài nguyên trong template.',
          'Từ khóa đề thi: "Infrastructure as Code (IaC)", "triển khai lặp lại nhất quán qua các Region" -> chọn ngay AWS CloudFormation.'
        ],
        isCore: true
      },
      {
        id: 'lec-121',
        number: 121,
        titleEn: 'CloudFormation Hands On',
        titleVi: 'Thực hành tạo Stack, Cập nhật Change Set & Xóa Stack an toàn',
        summaryEn: 'Hands on: deploy a single EC2 instance via YAML template, update stack with parameters and Elastic IP, inspect change sets (Replacement = True warning), and safely delete all resources in order.',
        summaryVi: 'Thực hành: tạo máy ảo EC2 từ template YAML, cập nhật stack có tham số và Elastic IP, kiểm tra Change Set (chú ý cảnh báo Replacement = True) và xóa stack sạch sẽ đúng thứ tự.',
        keyPointsEn: [
          'Resources block: defines AWS resources (e.g. MyInstance of type AWS::EC2::Instance).',
          'Parameters block: prompts user for customizable inputs during stack creation/update.',
          'Change Set preview: shows changes before applying. "Replacement = True" means old instance is terminated and replaced.',
          'Deletion rule: NEVER delete individual resources manually in console; click Delete Stack to let CloudFormation delete everything in reverse order.'
        ],
        keyPointsVi: [
          'Khối Resources: định nghĩa các tài nguyên AWS cần tạo (ví dụ kiểu AWS::EC2::Instance).',
          'Khối Parameters: cho phép người dùng nhập tham số tùy chỉnh khi khởi chạy hoặc cập nhật stack.',
          'Change Set preview: xem trước thay đổi; chú ý nếu có "Replacement = True" thì máy ảo cũ sẽ bị xóa và thay bằng máy mới.',
          'Quy tắc vàng khi xóa: KHÔNG xóa thủ công từng tài nguyên trên console; hãy bấm Delete Stack để CloudFormation dọn sạch đúng thứ tự.'
        ]
      },
      {
        id: 'lec-122',
        number: 122,
        titleEn: 'AWS CDK Overview',
        titleVi: 'Tổng quan AWS Cloud Development Kit (CDK)',
        summaryEn: 'AWS CDK lets developers define cloud infrastructure using familiar programming languages (TypeScript, Python, Java, .NET) which compiles via CDK CLI into standard CloudFormation templates.',
        summaryVi: 'AWS CDK cho phép lập trình viên định nghĩa hạ tầng bằng ngôn ngữ lập trình quen thuộc (TypeScript, Python, Java, .NET) sau đó được CDK CLI biên dịch thành template CloudFormation.',
        table: {
          headers: ['Tiêu chí so sánh', 'AWS CloudFormation', 'AWS Cloud Development Kit (CDK)'],
          rows: [
            ['Định dạng viết', 'Khai báo bằng văn bản tĩnh YAML hoặc JSON', 'Ngôn ngữ lập trình hướng đối tượng (TypeScript, Python, Java, C#)'],
            ['Tính năng lập trình', 'Không có vòng lặp, điều kiện logic hạn chế', 'Hỗ trợ đầy đủ vòng lặp for, câu lệnh if-else, lập trình hướng đối tượng'],
            ['Kiểm tra an toàn kiểu', 'Chỉ kiểm tra cú pháp khi upload lên AWS', 'Kiểm tra kiểu dữ liệu tĩnh (Type safety) ngay trong IDE khi gõ code'],
            ['Cơ chế triển khai', 'CloudFormation engine đọc trực tiếp file YAML/JSON', 'CDK CLI biên dịch (compile) mã nguồn thành CloudFormation template rồi mới deploy'],
            ['Trường hợp lý tưởng', 'Quản trị viên hạ tầng, DevOps thích cấu hình khai báo', 'Lập trình viên muốn viết code ứng dụng (Lambda/ECS) và hạ tầng chung 1 ngôn ngữ']
          ]
        },
        keyPointsEn: [
          'Define infrastructure using programming languages: JavaScript/TypeScript, Python, Java, .NET, Go.',
          'Code is compiled by CDK CLI into standard CloudFormation JSON/YAML templates.',
          'Deploy infrastructure and application code together (perfect for Lambda functions and ECS containers).',
          'Enables code reuse, object-oriented constructs, loops, and package management (npm, pip, maven).',
          'Exam keyword: "Define infrastructure in a programming language (Python/TypeScript)" -> AWS CDK.'
        ],
        keyPointsVi: [
          'Định nghĩa hạ tầng bằng ngôn ngữ lập trình thân thuộc: TypeScript, Python, Java, .NET, Go.',
          'Mã nguồn được CDK CLI biên dịch thành template JSON/YAML chuẩn của CloudFormation.',
          'Triển khai mã nguồn hạ tầng và code ứng dụng cùng nhau (rất thích hợp cho hàm Lambda và Docker ECS).',
          'Tận dụng sức mạnh lập trình: kiểm tra kiểu dữ liệu, vòng lặp for, tái sử dụng code qua thư viện npm/pip.',
          'Từ khóa đề thi: "Định nghĩa hạ tầng bằng ngôn ngữ lập trình (Python, TypeScript)" -> chọn ngay AWS CDK.'
        ],
        isCore: true
      },
      {
        id: 'lec-123',
        number: 123,
        titleEn: 'Elastic Beanstalk Overview',
        titleVi: 'Tổng quan AWS Elastic Beanstalk (PaaS lấy Developer làm trung tâm)',
        summaryEn: 'Elastic Beanstalk is a managed Platform as a Service (PaaS) that handles provisioning, load balancing, auto scaling, and health monitoring. Developer only supplies application code.',
        summaryVi: 'Elastic Beanstalk là dịch vụ nền tảng (PaaS) được quản lý tự động lo cấp phát máy chủ, cân bằng tải, mở rộng ASG và giám sát sức khỏe. Developer chỉ cần tập trung vào code ứng dụng.',
        table: {
          headers: ['Mô hình điện toán', 'Dịch vụ AWS đại diện', 'Trách nhiệm của bạn'],
          rows: [
            ['IaaS (Hạ tầng như dịch vụ)', 'Amazon EC2', 'Quản lý hệ điều hành, cấu hình mạng, cài phần mềm, cấu hình ASG, vá lỗi bảo mật'],
            ['PaaS (Nền tảng như dịch vụ)', 'AWS Elastic Beanstalk', 'CHỈ QUẢN LÝ MÃ NGUỒN ỨNG DỤNG; AWS tự lo máy chủ, OS, load balancer, ASG'],
            ['SaaS (Phần mềm như dịch vụ)', 'AWS Rekognition, Google Workspace', 'Chỉ sử dụng phần mềm hoàn thiện qua giao diện hoặc API']
          ]
        },
        keyPointsEn: [
          'PaaS (Platform as a Service): developer responsibility is ONLY application code.',
          'The Elastic Beanstalk service itself is completely FREE; you pay only for underlying EC2/ELB/RDS resources.',
          'Built on CloudFormation behind the scenes: creates and manages all underlying AWS resources.',
          '3 architecture models: Single Instance (dev), Load Balancer + ASG (prod web), ASG only (worker jobs).',
          'Health monitoring: health agent on each EC2 instance pushes metrics to CloudWatch and publishes health states.'
        ],
        keyPointsVi: [
          'Mô hình PaaS: trách nhiệm duy nhất của lập trình viên là viết mã nguồn ứng dụng.',
          'Bản thân dịch vụ Beanstalk hoàn toàn MIỄN PHÍ; bạn chỉ trả tiền cho các tài nguyên EC2, ELB, RDS bên dưới.',
          'Phía sau sử dụng CloudFormation: tự động tạo và quản lý toàn bộ các thành phần hạ tầng.',
          '3 mô hình kiến trúc: Single Instance (cho dev), Load Balancer + ASG (cho web production), Chỉ ASG (cho worker).',
          'Giám sát sức khỏe tích hợp: health agent trên mỗi EC2 instance gửi chỉ số lên CloudWatch để đánh giá tình trạng.'
        ],
        isCore: true
      },
      {
        id: 'lec-124',
        number: 124,
        titleEn: 'Beanstalk Hands On',
        titleVi: 'Thực hành tạo ứng dụng Beanstalk & Khám phá tài nguyên ngầm',
        summaryEn: 'Hands on: create a Node.js web server environment, observe the underlying CloudFormation stack, explore EC2 instances and Auto Scaling Groups, test sample site, and clean up application.',
        summaryVi: 'Thực hành: tạo môi trường Node.js web server, quan sát stack CloudFormation tạo ngầm, khám phá máy ảo EC2 và Auto Scaling Group, mở trang web mẫu và xóa ứng dụng.',
        keyPointsEn: [
          'Environment tiers: Web Server environment (HTTP traffic) vs Worker environment (processes SQS queue tasks).',
          'Service role and EC2 instance profile: grants Beanstalk permission to manage resources on your behalf.',
          'Events tab exposes CloudFormation events showing ASG, Security Group, and Elastic IP creation.',
          'Configuration tab allows changing instance types, scaling triggers, and environment variables without code change.',
          'Cleanup: choose Actions -> Delete Application to cleanly terminate all environments and resources.'
        ],
        keyPointsVi: [
          'Loại môi trường: Web Server environment (nhận web traffic) vs Worker environment (xử lý tác vụ từ hàng đợi SQS).',
          'Service role và EC2 instance profile: cấp quyền cho Beanstalk thay mặt bạn khởi tạo và quản lý máy chủ.',
          'Tab Events hiển thị trực tiếp các sự kiện của CloudFormation tạo ASG, Security Group và Elastic IP.',
          'Tab Configuration cho phép đổi loại instance, ngưỡng co giãn và biến môi trường mà không cần sửa code.',
          'Dọn dẹp: chọn Actions -> Delete Application để xóa sạch toàn bộ môi trường và tài nguyên liên quan.'
        ]
      },
      {
        id: 'lec-125',
        number: 125,
        titleEn: 'CodeDeploy Overview',
        titleVi: 'Tổng quan AWS CodeDeploy (Triển khai ứng dụng Hybrid tự động)',
        summaryEn: 'CodeDeploy automates application deployments to fleets of servers. Works with both EC2 instances and on-premises servers (hybrid service) using the CodeDeploy agent.',
        summaryVi: 'CodeDeploy tự động hóa triển khai và nâng cấp ứng dụng lên đội máy chủ. Hoạt động trên cả máy ảo EC2 và server tại chỗ on-premises (dịch vụ hybrid) thông qua CodeDeploy agent.',
        table: {
          headers: ['Đặc điểm của CodeDeploy', 'Ý nghĩa đối với doanh nghiệp'],
          rows: [
            ['Nâng cấp tự động v1 lên v2', 'Tự động tải mã mới, dừng app cũ, cài app mới và kiểm tra sức khỏe trên hàng loạt server'],
            ['Hỗ trợ môi trường Hybrid', 'Triển khai đồng nhất lên cả máy ảo Amazon EC2 VÀ máy chủ vật lý on-premises tại chỗ'],
            ['Yêu cầu máy chủ', 'Máy chủ phải được cấp phát trước và bắt buộc phải cài đặt CodeDeploy Agent'],
            ['Chiến lược triển khai linh hoạt', 'Hỗ trợ Rolling update, Blue/Green deployment giúp giảm thiểu tối đa thời gian gián đoạn (zero-downtime)']
          ]
        },
        keyPointsEn: [
          'Automates code deployments to EC2 instances and on-premises servers (hybrid service).',
          'Servers must be provisioned in advance and have the CodeDeploy Agent installed.',
          'Enables moving to AWS by keeping the exact same deployment methodology across on-premises and cloud.',
          'Exam keyword: "deploy applications to EC2 and on-premises servers automatically" -> AWS CodeDeploy.'
        ],
        keyPointsVi: [
          'Tự động hóa triển khai code lên cả máy ảo EC2 và server tại chỗ on-premises (dịch vụ hybrid).',
          'Máy chủ phải được chuẩn bị trước và bắt buộc phải cài đặt CodeDeploy Agent.',
          'Giúp doanh nghiệp chuyển dịch lên mây dễ dàng nhờ dùng chung một quy trình deploy duy nhất cho on-prem và cloud.',
          'Từ khóa đề thi: "triển khai ứng dụng tự động lên EC2 và server tại chỗ (on-premises)" -> chọn ngay AWS CodeDeploy.'
        ],
        isCore: true
      },
      {
        id: 'lec-126',
        number: 126,
        titleEn: 'CodeCommit Overview',
        titleVi: 'Tổng quan AWS CodeCommit (Kho lưu trữ mã nguồn Git riêng tư)',
        summaryEn: 'AWS CodeCommit is a secure, highly available, managed Git-based code repository service. Private code repository inside your own AWS account with IAM access controls.',
        summaryVi: 'AWS CodeCommit là dịch vụ lưu trữ mã nguồn dựa trên Git được quản lý hoàn toàn, an toàn và sẵn sàng cao. Kho code riêng tư trong tài khoản AWS được bảo vệ bằng IAM.',
        keyPointsEn: [
          'Git-based version control repository hosted securely on AWS.',
          'Collaborative development: versioning, pull requests, branching, and rollbacks.',
          'Integrated with AWS security: encrypted at rest, access controlled via IAM policies.',
          'Exam keyword: "private Git repository in AWS" -> AWS CodeCommit.'
        ],
        keyPointsVi: [
          'Kho lưu trữ mã nguồn kiểm soát phiên bản dựa trên Git được lưu trữ an toàn trên AWS.',
          'Hỗ trợ làm việc nhóm: quản lý phiên bản, pull request, phân nhánh và khôi phục mã nguồn cũ.',
          'Bảo mật tuyệt đối: mã hóa dữ liệu khi nghỉ, phân quyền truy cập chặt chẽ qua IAM policy.',
          'Từ khóa đề thi: "kho mã nguồn Git riêng tư trên AWS" -> chọn ngay AWS CodeCommit.'
        ]
      },
      {
        id: 'lec-127',
        number: 127,
        titleEn: 'CodeBuild Overview',
        titleVi: 'Tổng quan AWS CodeBuild (Biên dịch mã & Kiểm thử tự động Serverless)',
        summaryEn: 'Fully managed, serverless build service that compiles source code, runs automated unit tests, and produces deployable software packages (artifacts).',
        summaryVi: 'Dịch vụ build hoàn toàn serverless giúp biên dịch mã nguồn, chạy kiểm thử tự động và đóng gói thành các artifact sẵn sàng triển khai.',
        keyPointsEn: [
          'Serverless build service: no build servers to manage or provision.',
          'Retrieves code from CodeCommit/GitHub, runs instructions defined in buildspec.yml, produces artifacts.',
          'Pay-as-you-go: billed only for the exact minutes compute resources are running during the build.',
          'Continuous scaling: scales automatically to handle multiple builds concurrently.',
          'Exam keyword: "compile source code and run automated tests in AWS" -> AWS CodeBuild.'
        ],
        keyPointsVi: [
          'Dịch vụ build serverless: không cần quản trị hay duy trì máy chủ build riêng.',
          'Kéo code từ CodeCommit hoặc GitHub, thực thi lệnh trong file buildspec.yml, xuất ra gói artifact.',
          'Tính tiền theo phút thực tế sử dụng trong lúc quá trình build diễn ra.',
          'Tự động co giãn liên tục: xử lý đồng thời nhiều lượt build mà không bị nghẽn hàng đợi.',
          'Từ khóa đề thi: "biên dịch mã nguồn và chạy kiểm thử tự động trên AWS" -> chọn ngay AWS CodeBuild.'
        ],
        isCore: true
      },
      {
        id: 'lec-128',
        number: 128,
        titleEn: 'CodePipeline Overview',
        titleVi: 'Tổng quan AWS CodePipeline (Điều phối quy trình CI/CD tự động)',
        summaryEn: 'Continuous integration and continuous delivery (CI/CD) orchestration service. Automatically triggers build, test, and deployment steps whenever code changes are committed.',
        summaryVi: 'Dịch vụ điều phối quy trình tích hợp và phân phối liên tục (CI/CD). Tự động kích hoạt các bước build, test và deploy mỗi khi có thay đổi mã nguồn mới.',
        table: {
          headers: ['Giai đoạn trong Pipeline', 'Dịch vụ AWS thực hiện', 'Nhiệm vụ cụ thể'],
          rows: [
            ['1. Source (Nguồn mã)', 'AWS CodeCommit / GitHub / S3', 'Phát hiện mã nguồn mới được push lên và kích hoạt pipeline'],
            ['2. Build & Test', 'AWS CodeBuild', 'Biên dịch mã nguồn, chạy unit test và tạo gói cài đặt artifact'],
            ['3. Deploy (Triển khai)', 'AWS CodeDeploy / Elastic Beanstalk / ECS', 'Triển khai gói phần mềm lên máy chủ thử nghiệm hoặc production'],
            ['4. Điều phối tổng thể', 'AWS CodePipeline', 'Gắn kết và tự động hóa toàn bộ luồng từ Source -> Build -> Test -> Deploy']
          ]
        },
        keyPointsEn: [
          'Orchestrates the entire CI/CD pipeline from code commit to production deployment.',
          'Compatible with CodeCommit, CodeBuild, CodeDeploy, Elastic Beanstalk, CloudFormation, GitHub, and 3rd-party tools.',
          'Enables rapid, reliable updates and fast delivery of features to production.',
          'Exam keyword: "orchestrate CI/CD pipeline steps", "automate delivery from code to production" -> AWS CodePipeline.'
        ],
        keyPointsVi: [
          'Điều phối toàn bộ chuỗi CI/CD từ lúc commit code cho đến khi đưa lên máy chủ production.',
          'Tương thích mượt mà với CodeCommit, CodeBuild, CodeDeploy, Elastic Beanstalk, CloudFormation và GitHub.',
          'Giúp doanh nghiệp phát hành tính năng mới nhanh chóng, liên tục và giảm thiểu lỗi con người.',
          'Từ khóa đề thi: "điều phối các bước CI/CD", "tự động hóa luồng release từ code đến production" -> chọn ngay AWS CodePipeline.'
        ],
        isCore: true
      },
      {
        id: 'lec-129',
        number: 129,
        titleEn: 'CodeArtifact Overview',
        titleVi: 'Tổng quan AWS CodeArtifact (Quản lý gói phần mềm & Dependency)',
        summaryEn: 'Secure, scalable, and managed artifact repository service for software development. Works with popular package managers like Maven, Gradle, npm, yarn, pip, twine, and NuGet.',
        summaryVi: 'Kho lưu trữ và quản lý artifact, thư viện phần mềm an toàn và mở rộng. Tương thích với các công cụ quản lý gói phổ biến: npm, yarn, pip, maven, gradle, nuget.',
        keyPointsEn: [
          'Artifact management: centralized, secure storage for software packages and third-party dependencies.',
          'Integrates natively with npm, pip, Maven, Gradle, NuGet, and yarn without changing developer habits.',
          'CodeBuild can retrieve dependencies directly and securely from CodeArtifact during the build phase.',
          'Exam keyword: "store and manage software dependencies and packages" -> AWS CodeArtifact.'
        ],
        keyPointsVi: [
          'Quản lý artifact: nơi lưu trữ tập trung, an toàn cho các gói phần mềm nội bộ và thư viện bên thứ ba.',
          'Tích hợp trực tiếp với npm, pip, Maven, Gradle, NuGet mà không làm thay đổi thói quen của lập trình viên.',
          'CodeBuild có thể kéo trực tiếp các dependency từ CodeArtifact trong quá trình build giúp tăng tốc độ và bảo mật.',
          'Từ khóa đề thi: "lưu trữ và quản lý gói phần mềm / dependency" -> chọn ngay AWS CodeArtifact.'
        ]
      },
      {
        id: 'lec-130',
        number: 130,
        titleEn: 'Systems Manager (SSM) Overview',
        titleVi: 'Tổng quan AWS Systems Manager (SSM - Quản lý đội máy chủ Hybrid quy mô lớn)',
        summaryEn: 'AWS Systems Manager is a hybrid operations management service that helps you patch, configure, and run commands across fleets of EC2 instances and on-premises servers at scale.',
        summaryVi: 'AWS Systems Manager là dịch vụ quản trị vận hành hybrid giúp vá lỗi tự động, cấu hình và chạy lệnh trên hàng loạt máy ảo EC2 và server tại chỗ on-premises ở quy mô lớn.',
        table: {
          headers: ['Tính năng chính của SSM', 'Mô tả & Ý nghĩa thực tế'],
          rows: [
            ['Patch Manager (Vá lỗi tự động)', 'Tự động quét và vá lỗi bảo mật cho toàn bộ hệ điều hành trên đội máy chủ để đảm bảo tuân thủ'],
            ['Run Command (Chạy lệnh từ xa)', 'Thực thi các lệnh script hoặc cài đặt phần mềm đồng loạt trên hàng trăm server mà không cần SSH từng máy'],
            ['Fleet Manager (Quản lý đội máy)', 'Giao diện trung tâm theo dõi trạng thái, thông tin phần cứng và hệ điều hành của mọi server'],
            ['Bản chất Hybrid', 'Hoạt động trên Linux, Windows, macOS, Raspberry Pi ở cả trên AWS EC2 VÀ máy chủ vật lý on-premises'],
            ['SSM Agent', 'Yêu cầu cài đặt phần mềm SSM Agent nhỏ chạy ngầm (mặc định đã có sẵn trên Amazon Linux)']
          ]
        },
        keyPointsEn: [
          'Hybrid management service: manages both AWS EC2 instances and on-premises physical/virtual servers.',
          'Requires SSM Agent running on instances (pre-installed on Amazon Linux and Ubuntu AMIs).',
          'Automatic patching: keeps whole fleets of instances up to date and compliant.',
          'Run Command: executes shell scripts across thousands of instances simultaneously without SSH access.',
          'Exam keyword: "patch fleet of EC2 and on-premises servers", "run command across all servers at scale" -> AWS Systems Manager.'
        ],
        keyPointsVi: [
          'Dịch vụ quản trị Hybrid: quản lý đồng thời cả máy ảo EC2 trên AWS và server vật lý/máy ảo tại chỗ on-premises.',
          'Yêu cầu cài đặt SSM Agent (chương trình nhỏ chạy ngầm, mặc định đã cài sẵn trên Amazon Linux).',
          'Vá lỗi tự động (Automatic Patching): tự động cập nhật bản vá bảo mật cho toàn bộ đội máy chủ.',
          'Run Command: chạy lệnh shell trên hàng nghìn server cùng lúc mà không cần mở kết nối SSH vào từng máy.',
          'Từ khóa đề thi: "vá lỗi hàng loạt máy ảo EC2 và server tại chỗ", "chạy lệnh đồng loạt trên toàn bộ server" -> chọn ngay AWS Systems Manager.'
        ],
        isCore: true
      },
      {
        id: 'lec-131',
        number: 131,
        titleEn: 'SSM Session Manager',
        titleVi: 'SSM Session Manager (Mở Shell an toàn không cần cổng 22 & SSH Keys)',
        summaryEn: 'Session Manager provides a secure, auditable browser-based shell into EC2 instances and on-premises servers without needing open inbound ports (port 22 can stay closed), bastion hosts, or SSH keys.',
        summaryVi: 'Session Manager cung cấp terminal shell an toàn ngay trên trình duyệt web vào máy ảo EC2 mà không cần mở cổng inbound (cổng 22 đóng hoàn toàn), không cần bastion host hay SSH key.',
        table: {
          headers: ['Phương thức truy cập EC2', 'Cổng 22 (SSH)', 'Khóa SSH Key', 'Yêu cầu cấu hình'],
          rows: [
            ['SSH truyền thống', 'BẮT BUỘC MỞ (Inbound port 22)', 'Bắt buộc phải có file .pem private key', 'Cần Bastion host nếu instance nằm trong Private Subnet'],
            ['EC2 Instance Connect', 'BẮT BUỘC MỞ (Inbound port 22)', 'Không cần (tự động đẩy khóa tạm qua IAM)', 'Chỉ hoạt động với Linux có cài EC2 Instance Connect'],
            ['SSM Session Manager', 'ĐÓNG HOÀN TOÀN (Port 22 closed)', 'HOÀN TOÀN KHÔNG CẦN KHÓA SSH', 'Cần IAM Role (AmazonSSMManagedInstanceCore) + SSM Agent']
          ]
        },
        keyPointsEn: [
          'No inbound rules needed: Security group can keep port 22 completely CLOSED for maximum security.',
          'No SSH keys or bastion hosts required: authentication and authorization handled entirely by IAM.',
          'Browser-based shell: start interactive terminal directly from AWS Management Console.',
          'Auditing & Compliance: session logs can be recorded and streamed automatically to Amazon S3 or CloudWatch Logs.',
          'Requirement: instance must have SSM Agent installed and an IAM Role with AmazonSSMManagedInstanceCore attached.',
          'Exam keyword: "secure shell to EC2 with port 22 closed and no SSH keys" -> SSM Session Manager.'
        ],
        keyPointsVi: [
          'Không cần mở cổng inbound: Security Group có thể đóng hoàn toàn cổng 22 để đạt chuẩn bảo mật cao nhất.',
          'Không cần SSH key hay máy chủ trung gian Bastion host: toàn bộ quyền truy cập được kiểm soát bằng IAM.',
          'Terminal trên web: mở dòng lệnh tương tác trực tiếp ngay trong trình duyệt từ AWS Console.',
          'Kiểm toán và lưu trữ: toàn bộ thao tác lệnh trong phiên có thể tự động ghi log gửi về S3 hoặc CloudWatch Logs.',
          'Điều kiện cần: máy ảo phải có SSM Agent đang chạy và được gắn IAM Role có quyền AmazonSSMManagedInstanceCore.',
          'Từ khóa đề thi: "kết nối shell vào EC2 an toàn không mở cổng 22 và không dùng khóa SSH" -> chọn ngay SSM Session Manager.'
        ],
        isCore: true
      },
      {
        id: 'lec-132',
        number: 132,
        titleEn: 'SSM Parameter Store',
        titleVi: 'SSM Parameter Store (Lưu trữ cấu hình & Secret Serverless an toàn)',
        summaryEn: 'Secure, serverless key-value storage for configuration data, passwords, and API keys. Supports version tracking, fine-grained IAM permissions, and optional AWS KMS encryption.',
        summaryVi: 'Kho lưu trữ cấu hình và secret dạng key-value serverless an toàn. Hỗ trợ theo dõi lịch sử phiên bản, phân quyền IAM chi tiết và mã hóa bảo mật bằng AWS KMS.',
        table: {
          headers: ['Loại Parameter', 'Mô tả & Đặc điểm bảo mật', 'Trường hợp sử dụng thực tế'],
          rows: [
            ['String', 'Chuỗi văn bản thuần túy không mã hóa', 'Đường dẫn URL database, tham số cấu hình ứng dụng, cờ tính năng (Feature flags)'],
            ['StringList', 'Danh sách các chuỗi phân tách bằng dấu phẩy', 'Danh sách IP cho phép, danh sách tên miền subnet'],
            ['SecureString', 'Chuỗi bí mật ĐƯỢC MÃ HÓA bằng khóa AWS KMS', 'Mật khẩu cơ sở dữ liệu, API keys, mã bản quyền bí mật']
          ]
        },
        keyPointsEn: [
          'Serverless, scalable, durable storage for configuration values and application secrets.',
          'Tiers: Standard (free) and Advanced (for larger values up to 8 KB and parameter policies).',
          'Data types: String, StringList, and SecureString (encrypted with AWS KMS keys).',
          'Version tracking: editing a parameter automatically increments version history (v1, v2, v3).',
          'Exam keyword: "store configuration and secrets securely in AWS" -> SSM Parameter Store.'
        ],
        keyPointsVi: [
          'Lưu trữ cấu hình và mật khẩu serverless, bền vững và tự động mở rộng không tốn phí duy trì.',
          'Gói cước: Standard (hoàn toàn miễn phí) và Advanced (cho tham số lớn tới 8 KB).',
          '3 kiểu tham số: String, StringList, và SecureString (tự động mã hóa an toàn bằng AWS KMS).',
          'Theo dõi phiên bản: mỗi lần chỉnh sửa tham số sẽ tự động tạo phiên bản mới giúp dễ dàng rollback.',
          'Từ khóa đề thi: "lưu cấu hình và mật khẩu an toàn có mã hóa KMS" -> chọn ngay SSM Parameter Store.'
        ],
        isCore: true
      },
      {
        id: 'lec-133',
        number: 133,
        titleEn: 'Deployment & Developer Services Summary',
        titleVi: 'Bảng tra cứu ma trận quyết định Triển khai & Developer Services',
        summaryEn: 'Comprehensive decision matrix comparing CloudFormation, Elastic Beanstalk, CodeDeploy, Systems Manager, CodeCommit, CodeBuild, CodePipeline, CodeArtifact, and CDK.',
        summaryVi: 'Bảng tra cứu ma trận quyết định toàn diện so sánh các dịch vụ triển khai và công cụ phát triển phần mềm trên AWS cho kỳ thi chứng chỉ.',
        table: {
          headers: ['Nếu đề bài thi yêu cầu...', 'Dịch vụ AWS bạn cần chọn ngay', 'Phân loại'],
          rows: [
            ['Hạ tầng dưới dạng mã (IaC) khai báo bằng JSON/YAML', 'AWS CloudFormation', 'Deployment / IaC'],
            ['Định nghĩa hạ tầng bằng ngôn ngữ lập trình (TypeScript/Python)', 'AWS CDK (Cloud Development Kit)', 'IaC / Developer'],
            ['Nền tảng PaaS cho lập trình viên, chỉ cần đưa mã nguồn ứng dụng', 'AWS Elastic Beanstalk', 'PaaS Compute'],
            ['Tự động triển khai ứng dụng lên cả EC2 và server on-premises (Hybrid)', 'AWS CodeDeploy', 'Hybrid Deployment'],
            ['Kho lưu trữ mã nguồn Git riêng tư có quản lý phiên bản', 'AWS CodeCommit', 'CI/CD Source'],
            ['Biên dịch mã và chạy unit test tự động serverless', 'AWS CodeBuild', 'CI/CD Build'],
            ['Điều phối tự động toàn bộ luồng CI/CD từ code đến production', 'AWS CodePipeline', 'CI/CD Orchestration'],
            ['Lưu trữ và quản lý các gói phần mềm, dependency (npm, pip, maven)', 'AWS CodeArtifact', 'Package Repository'],
            ['Vá lỗi tự động và chạy lệnh đồng loạt trên cả đội máy chủ hybrid', 'AWS Systems Manager (SSM)', 'Operations / Management'],
            ['Mở shell dòng lệnh vào EC2 không cần mở cổng 22 hay dùng SSH key', 'SSM Session Manager', 'Secure Operations'],
            ['Lưu trữ tham số cấu hình và mật khẩu serverless có mã hóa KMS', 'SSM Parameter Store', 'Configuration & Secrets']
          ]
        },
        keyPointsEn: [
          'CloudFormation: AWS-only IaC for almost all resources; repeatable across Regions and accounts.',
          'Elastic Beanstalk: PaaS for web apps; developer focuses only on code; uses CloudFormation under the hood.',
          'CodeDeploy: deploys applications to EC2 and on-premises servers (hybrid).',
          'CodePipeline: orchestrates CI/CD pipeline from source to deploy.',
          'Systems Manager: hybrid operations, patching, running commands at scale; Session Manager removes port 22 need; Parameter Store stores secrets.'
        ],
        keyPointsVi: [
          'CloudFormation: giải pháp IaC độc quyền của AWS cho hầu hết mọi tài nguyên; lặp lại qua nhiều Region/tài khoản.',
          'Elastic Beanstalk: PaaS cho web; developer chỉ tập trung vào code; bên dưới tự tạo stack CloudFormation.',
          'CodeDeploy: triển khai ứng dụng tự động lên EC2 và server tại chỗ (dịch vụ hybrid).',
          'CodePipeline: điều phối toàn bộ chuỗi CI/CD từ nguồn đến khi hoàn tất triển khai.',
          'Systems Manager: quản trị hybrid, vá lỗi, chạy lệnh đồng loạt; Session Manager xóa bỏ nhu cầu mở cổng 22; Parameter Store lưu trữ secret.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-12',
    sectionNumber: 12,
    titleEn: 'Leveraging the AWS Global Infrastructure (Route 53, CloudFront, Global Accelerator, Outposts & Edge)',
    titleVi: 'Tận dụng Hạ tầng Toàn cầu của AWS (Route 53, CloudFront, Global Accelerator & Edge Computing)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Global Core',
    overviewEn: 'Section 12 covers architectures for building global, resilient, and ultra-low-latency applications on AWS: Route 53 (managed DNS & routing policies), Amazon CloudFront (global CDN & edge caching), S3 Transfer Acceleration, AWS Global Accelerator (Anycast IPs & private AWS fiber network), and Hybrid/Edge infrastructure (AWS Outposts, AWS Wavelength 5G, and AWS Local Zones).',
    overviewVi: 'Section 12 trang bị kiến thức toàn diện về xây dựng ứng dụng toàn cầu với độ trễ tối thiểu và tính sẵn sàng cao trên AWS: Route 53 (DNS quản lý & các chính sách định tuyến), Amazon CloudFront (CDN toàn cầu & bộ nhớ đệm tại Edge), S3 Transfer Acceleration, AWS Global Accelerator (IP Anycast & mạng cáp quang riêng của AWS), cùng hệ sinh thái Hybrid/Edge Compute (AWS Outposts, AWS Wavelength 5G và AWS Local Zones).',
    quickExamFacts: [
      {
        en: 'Route 53 is a highly available, managed authoritative DNS service (Port 53, 100% SLA). Supports Simple, Weighted, Latency, Failover (Disaster Recovery), Geolocation, and Multi-Value routing policies.',
        vi: 'Route 53 là dịch vụ DNS quản lý có độ sẵn sàng 100% SLA (Cổng 53). Hỗ trợ các chính sách: Simple, Weighted (thử nghiệm canary), Latency (độ trễ), Failover (khôi phục thảm họa DR), Geolocation và Multi-Value.',
        isCoreHighlight: true
      },
      {
        en: 'CloudFront is a Global Content Delivery Network (CDN) that caches static/dynamic HTTP/HTTPS content at Edge Locations. Secures S3 origins with Origin Access Control (OAC). Invalidation clears cached content.',
        vi: 'CloudFront là CDN toàn cầu lưu cache nội dung HTTP/HTTPS tại các Edge Location. Bảo vệ S3 bucket bằng Origin Access Control (OAC) và cho phép xóa cache bằng tính năng Invalidation.',
        isCoreHighlight: true
      },
      {
        en: 'CloudFront vs Global Accelerator: CloudFront CACHES static web content at edges (HTTP/HTTPS/WebSocket). Global Accelerator does NOT cache, routes TCP/UDP traffic over private AWS fiber with 2 static Anycast IPs for gaming, VoIP, and multi-region failover.',
        vi: 'So sánh CloudFront vs Global Accelerator: CloudFront CÓ CACHE nội dung web ở Edge (HTTP/HTTPS). Global Accelerator KHÔNG CACHE, chuyển tiếp lưu lượng TCP/UDP qua mạng cáp quang riêng của AWS bằng 2 IP Anycast tĩnh cho game, thoại VoIP và chuyển vùng dự phòng.',
        isCoreHighlight: true
      },
      {
        en: 'S3 Transfer Acceleration speeds up uploads to S3 from anywhere in the world by uploading to the nearest AWS Edge Location, then routing over AWS private network.',
        vi: 'S3 Transfer Acceleration tăng tốc tải file lên S3 từ mọi nơi trên thế giới bằng cách đẩy dữ liệu vào Edge Location gần nhất, rồi truyền qua mạng cáp quang nội bộ AWS về bucket.',
        isCoreHighlight: true
      },
      {
        en: 'Edge Compute Triangle: Outposts = AWS server racks inside your private data center (Data Residency/Local processing). Wavelength = AWS servers inside Telecom 5G networks (single-digit ms for 5G mobile/smart cars). Local Zones = AWS compute/storage placed in major metropolitan cities without a full Region (<10ms latency).',
        vi: 'Bộ ba Edge Compute: Outposts = tủ rack AWS đặt trong data center doanh nghiệp (lưu trữ tại chỗ/tuân thủ pháp lý). Wavelength = máy chủ AWS đặt bên trong mạng viễn thông 5G (độ trễ vài mili-giây cho 5G/xe tự hành). Local Zones = đưa compute/storage về gần các siêu đô thị không có Region (<10ms).',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-134',
        number: 134,
        titleEn: 'Why Global Applications?',
        titleVi: 'Tại sao cần ứng dụng toàn cầu? (Độ trễ, Khắc phục thảm họa & Tấn công)',
        summaryEn: 'Understanding the motivations and business drivers for building global architectures on AWS: drastically decreasing network latency for international users, implementing robust Disaster Recovery (DR) strategies, and gaining massive DDoS attack resilience.',
        summaryVi: 'Tìm hiểu động lực và lý do doanh nghiệp cần triển khai ứng dụng trên quy mô toàn cầu: giảm triệt để độ trễ mạng cho người dùng quốc tế, thiết lập chiến lược khắc phục thảm họa (Disaster Recovery - DR), và tăng cường khả năng chống đỡ các cuộc tấn công DDoS.',
        table: {
          headers: ['Mục tiêu kiến trúc toàn cầu', 'Thách thức khi chỉ dùng 1 Region', 'Giải pháp với Hạ tầng Toàn cầu AWS'],
          rows: [
            ['Giảm độ trễ (Latency)', 'Người dùng ở xa (vd: Úc truy cập server ở Bắc Mỹ) mất hàng trăm ms qua Internet công cộng', 'Triển khai máy chủ gần người dùng hoặc dùng Edge Location/CDN để phản hồi tức thì'],
            ['Khắc phục thảm họa (DR)', 'Nếu toàn bộ một Region gặp sự cố thiên tai/mất điện, toàn bộ hệ thống bị sập (Single Point of Failure)', 'Sao chép dữ liệu và dựng sẵn môi trường dự phòng ở Region thứ hai, tự động chuyển hướng khi gặp sự cố'],
            ['Khả năng chống chịu tấn công (DDoS)', 'Lưu lượng tấn công khổng lồ dồn vào 1 điểm duy nhất dễ làm sập tài nguyên máy chủ', 'Hạ tầng toàn cầu phân tán lưu lượng ra hàng trăm điểm biên (Edge), hấp thụ đòn tấn công trước khi chạm vào ứng dụng']
          ]
        },
        keyPointsEn: [
          'Global application: an application deployed in multiple AWS Regions or accessed globally via edge locations.',
          'Latency reduction: deploying closer to users improves end-user response times and satisfaction.',
          'Disaster Recovery (DR): if one AWS Region suffers an outage, traffic can immediately fail over to another Region.',
          'Security & DDoS protection: distributed architectures across AWS Edge Locations make distributed denial-of-service attacks much harder to succeed.',
          'Core global services: Route 53 (DNS), CloudFront (CDN), S3 Transfer Acceleration, AWS Global Accelerator, and Edge Services.'
        ],
        keyPointsVi: [
          'Ứng dụng toàn cầu: ứng dụng được triển khai trên nhiều AWS Region hoặc được tối ưu truy cập xuyên biên giới qua các Edge Location.',
          'Giảm độ trễ: đưa tài nguyên hoặc nội dung tới gần người dùng nhất giúp trang web tải nhanh và mượt mà.',
          'Khắc phục thảm họa (DR): nếu 1 Region gặp sự cố bất khả kháng, hệ thống có thể chuyển hướng truy cập sang Region khác ngay lập tức.',
          'Tăng cường bảo mật: hạ tầng phân tán trên mạng lưới toàn cầu giúp ứng dụng chống chịu tốt hơn trước các cuộc tấn công từ chối dịch vụ (DDoS).',
          'Các dịch vụ toàn cầu chủ chốt: Route 53 (DNS), CloudFront (CDN), S3 Transfer Acceleration, Global Accelerator và Edge Computing.'
        ],
        isCore: true
      },
      {
        id: 'lec-135',
        number: 135,
        titleEn: 'Route 53 Overview & Routing Policies',
        titleVi: 'Tổng quan Route 53 & Các chính sách định tuyến DNS',
        summaryEn: 'Amazon Route 53 is a highly available, scalable managed authoritative Domain Name System (DNS) web service. It translates human-friendly domain names into IP addresses, registers domains, checks resource health, and offers advanced routing policies.',
        summaryVi: 'Amazon Route 53 là dịch vụ hệ thống phân giải tên miền (DNS) được quản lý, có độ sẵn sàng 100% SLA và quy mô linh hoạt. Route 53 chuyển đổi tên miền sang địa chỉ IP, hỗ trợ đăng ký tên miền, kiểm tra sức khỏe tài nguyên và cung cấp nhiều chính sách định tuyến thông minh.',
        table: {
          headers: ['Chính sách định tuyến (Routing Policy)', 'Cách thức hoạt động', 'Trường hợp sử dụng điển hình trong đề thi'],
          rows: [
            ['Simple Routing', 'Trả về một hoặc nhiều IP ngẫu nhiên cho một tên miền; KHÔNG hỗ trợ Health Check', 'Trỏ tên miền về 1 máy chủ duy nhất hoặc phân phối tải DNS cơ bản'],
            ['Weighted Routing', 'Phân chia tỷ lệ % lưu lượng truy cập tới các máy chủ/môi trường khác nhau (vd: 80% v1, 20% v2)', 'Thử nghiệm tính năng mới (Canary release) hoặc kiểm thử tải máy chủ'],
            ['Latency-based Routing', 'Tự động chuyển hướng người dùng đến AWS Region có ĐỘ TRỄ MẠNG THẤP NHẤT cho họ', 'Tối ưu trải nghiệm cho ứng dụng có máy chủ đặt ở nhiều châu lục (Bắc Mỹ, Châu Âu, Châu Á)'],
            ['Failover Routing', 'Có 1 máy chủ Chính (Primary) và 1 máy chủ Dự phòng (Secondary) kèm Health Check. Tự động chuyển vùng khi Primary lỗi', 'Chiến lược phục hồi sau thảm họa (Disaster Recovery - DR) chế độ Active-Passive'],
            ['Geolocation Routing', 'Định tuyến dựa trên VỊ TRÍ ĐỊA LÝ của người dùng (quốc gia, châu lục, bang)', 'Bản địa hóa ngôn ngữ website (người dùng ở VN thấy tiếng Việt) hoặc giới hạn pháp lý nội dung'],
            ['Geoproximity Routing', 'Định tuyến theo khoảng cách địa lý giữa người dùng và tài nguyên, có thể chỉnh độ lệch (Bias)', 'Yêu cầu kiểm soát vùng phục vụ chính xác (cần Route 53 Traffic Flow)'],
            ['Multi-Value Answer Routing', 'Trả về danh sách tối đa 8 bản ghi IP khỏe mạnh (Healthy); CÓ hỗ trợ Health Check', 'Cân bằng tải đơn giản ở cấp độ DNS thay thế cho load balancer cơ bản']
          ]
        },
        keyPointsEn: [
          'Route 53 port: Port 53 is the standard networking port for DNS services.',
          'Availability: 100% SLA availability guarantee provided by AWS.',
          'Key Record Types: A (IPv4), AAAA (IPv6), CNAME (points hostname to another hostname; non-root only), Alias (AWS proprietary extension pointing hostname to AWS resources like ALB, CloudFront, S3 Website, API Gateway; supports apex/root domain and is free of charge).',
          'Hosted Zones: Public Hosted Zone (for queries coming from the internet) vs Private Hosted Zone (for internal queries within VPCs).',
          'Health Checks: automated monitoring of endpoints (HTTP, HTTPS, TCP); integrated with CloudWatch and Failover routing.',
          'Exam keyword: "DNS service with 100% SLA", "Alias record pointing root domain to ALB", "route users to lowest latency region" -> Route 53.'
        ],
        keyPointsVi: [
          'Cổng dịch vụ: Cổng 53 là cổng mạng chuẩn thế giới cho dịch vụ DNS.',
          'Độ tin cậy: Cam kết mức độ sẵn sàng 100% SLA từ AWS.',
          'Các loại bản ghi DNS cốt lõi: A (IPv4), AAAA (IPv6), CNAME (trỏ tên miền con sang tên miền khác; không trỏ được domain gốc), Alias (bản ghi độc quyền AWS trỏ domain về ALB, CloudFront, S3; dùng được cho domain gốc apex và hoàn toàn miễn phí truy vấn).',
          'Hosted Zone: Public Hosted Zone (cho truy vấn từ Internet bên ngoài) vs Private Hosted Zone (cho truy vấn nội bộ giữa các VPC).',
          'Health Checks: tự động kiểm tra định kỳ tình trạng sống của máy chủ qua HTTP/HTTPS/TCP; kết hợp với Failover routing để tự chuyển hướng khi lỗi.',
          'Từ khóa đề thi: "dịch vụ DNS cam kết 100% SLA", "bản ghi Alias trỏ domain gốc vào ALB", "chuyển người dùng đến region có độ trễ thấp nhất" -> chọn ngay Amazon Route 53.'
        ],
        isCore: true
      },
      {
        id: 'lec-136',
        number: 136,
        titleEn: 'Route 53 Hands-On',
        titleVi: 'Thực hành Route 53: Tạo Hosted Zone, Cấu hình Bản ghi & Health Check',
        summaryEn: 'Hands-on console walkthrough: navigating Route 53, creating Public and Private Hosted Zones, defining A records, testing CNAME vs Alias records, creating automated Health Checks, and configuring Failover routing.',
        summaryVi: 'Thực hành chi tiết trên AWS Console: làm quen giao diện Route 53, khởi tạo Hosted Zone công khai và nội bộ, tạo bản ghi A, phân biệt CNAME và Alias, tạo Health Check giám sát máy chủ và cấu hình chính sách định tuyến Failover.',
        keyPointsEn: [
          'Public Hosted Zone contains DNS records for public domains accessible on the internet.',
          'Private Hosted Zone is attached to specific VPCs and only resolves queries within those private networks.',
          'Alias records show target AWS resources directly in dropdown list (e.g., Application Load Balancer DNS name).',
          'Health Checks can monitor IP/port, domain name, or CloudWatch Alarms; status changes to unhealthy if consecutive checks fail.',
          'Failover policy setup: create Primary record with Health Check attached, create Secondary record pointing to backup page or disaster recovery server.'
        ],
        keyPointsVi: [
          'Public Hosted Zone chứa bản ghi DNS công khai cho phép cả thế giới trên Internet tra cứu.',
          'Private Hosted Zone được gắn vào các VPC cụ thể và chỉ phân giải tên miền cho các máy chủ nội bộ trong các VPC đó.',
          'Bản ghi Alias hiển thị trực tiếp danh sách tài nguyên AWS đích trong menu thả xuống (vd: chọn Application Load Balancer).',
          'Health Check có thể giám sát địa chỉ IP, cổng, tên miền hoặc CloudWatch Alarm; tự động đổi trạng thái sang Unhealthy nếu máy chủ không phản hồi.',
          'Cài đặt Failover: tạo bản ghi Primary gắn kèm Health Check, tạo bản ghi Secondary trỏ tới máy chủ dự phòng hoặc trang thông báo sự cố.'
        ]
      },
      {
        id: 'lec-137',
        number: 137,
        titleEn: 'CloudFront Overview (CDN)',
        titleVi: 'Tổng quan Amazon CloudFront (Mạng phân phối nội dung CDN toàn cầu)',
        summaryEn: 'Amazon CloudFront is a fast, highly secure Content Delivery Network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds using hundreds of Edge Locations.',
        summaryVi: 'Amazon CloudFront là mạng phân phối nội dung (CDN) toàn cầu tốc độ cao và an toàn. CloudFront truyền tải dữ liệu, video, ứng dụng và API tới người dùng trên toàn thế giới với độ trễ thấp và tốc độ tải vượt trội nhờ mạng lưới hàng trăm Edge Location.',
        table: {
          headers: ['Nguồn gốc dữ liệu (Origin)', 'Đặc điểm bảo mật & Kết nối', 'Trường hợp sử dụng thực tế'],
          rows: [
            ['Amazon S3 Bucket', 'Bảo mật bằng Origin Access Control (OAC) / Origin Access Identity (OAI) để chặn người dùng truy cập trực tiếp S3', 'Phân phối hình ảnh, video, tệp tĩnh CSS/JS, lưu trữ trang web tĩnh'],
            ['Custom Origin (HTTP/HTTPS)', 'Application Load Balancer (ALB), Máy ảo EC2, hoặc bất kỳ máy chủ HTTP on-premises nào', 'Tăng tốc ứng dụng web động, API backend, xử lý form tương tác'],
            ['AWS MediaPackage / S3 Media', 'Tích hợp với dịch vụ truyền thông của AWS', 'Phát video trực tiếp (Live streaming) và video theo yêu cầu (VOD)']
          ]
        },
        keyPointsEn: [
          'Edge Locations: hundreds of points of presence (PoP) across the globe caching content close to end users.',
          'Caching mechanisms: files are cached for the duration of Time-To-Live (TTL); subsequent requests are served from edge cache without touching the origin.',
          'CloudFront vs S3 Cross-Region Replication (CRR): CloudFront caches read-only files globally at low cost; CRR actively replicates data read/write to specific target regions.',
          'Origin Access Control (OAC): restricts S3 bucket access so users cannot bypass CloudFront and access S3 URLs directly.',
          'Security benefits: free DDoS protection with AWS Shield Standard, SSL/TLS certificate integration with AWS Certificate Manager (ACM), and integration with AWS WAF for web application firewall rules.',
          'Geo Restriction: allowlist or blocklist access based on country.',
          'Exam keyword: "CDN caching static content at edge locations", "protect S3 with OAC", "improve read performance globally" -> Amazon CloudFront.'
        ],
        keyPointsVi: [
          'Edge Location: hàng trăm điểm hiện diện (PoP) trên khắp thế giới lưu trữ bản sao dữ liệu sát người dùng cuối.',
          'Cơ chế Caching: tệp được lưu cache trong khoảng thời gian TTL; các yêu cầu tiếp theo được phục vụ ngay từ Edge mà không cần gửi về server gốc.',
          'So sánh CloudFront vs S3 CRR: CloudFront cache tệp đọc ở edge trên toàn cầu với chi phí tối ưu; S3 CRR sao chép cả dữ liệu đọc/ghi sang các Region cụ thể.',
          'Origin Access Control (OAC): chính sách bắt buộc người dùng phải đi qua CloudFront, chặn hoàn toàn truy cập trực tiếp vào URL của S3 bucket.',
          'Bảo mật tích hợp: chống DDoS miễn phí với AWS Shield Standard, chứng chỉ SSL/TLS miễn phí qua ACM, và bảo vệ tầng ứng dụng bằng AWS WAF.',
          'Geo Restriction: cho phép tạo danh sách trắng (Allowlist) hoặc danh sách đen (Blocklist) truy cập theo từng quốc gia.',
          'Từ khóa đề thi: "dịch vụ CDN lưu cache nội dung tĩnh tại edge", "bảo vệ S3 bằng OAC", "tăng tốc độ đọc dữ liệu trên toàn cầu" -> chọn ngay Amazon CloudFront.'
        ],
        isCore: true
      },
      {
        id: 'lec-138',
        number: 138,
        titleEn: 'CloudFront Hands-On',
        titleVi: 'Thực hành CloudFront: Tạo Distribution, Cấu hình OAC cho S3 & Xóa Cache',
        summaryEn: 'Hands-on guide to creating a CloudFront Web Distribution with an S3 bucket origin, applying Origin Access Control (OAC) bucket policies, testing Edge Location caching headers, and invalidating cached files.',
        summaryVi: 'Thực hành từng bước tạo CloudFront Web Distribution với nguồn dữ liệu S3, cấu hình chính sách Origin Access Control (OAC) bảo vệ bucket, kiểm tra header phản hồi từ Edge (X-Cache Hit/Miss), và thực hiện thao tác Invalidation để xóa cache tệp cũ.',
        table: {
          headers: ['Khái niệm thực hành CloudFront', 'Ý nghĩa & Lưu ý kỹ thuật quan trọng'],
          rows: [
            ['CloudFront Distribution', 'Cấu hình phân phối cấp một tên miền ngẫu nhiên dạng d111111abcdef8.cloudfront.net trỏ tới tài nguyên'],
            ['Origin Access Control (OAC)', 'Tạo chính sách tự động dán vào S3 Bucket Policy: s3:GetObject với điều kiện AWS:SourceArn là CloudFront ARN'],
            ['X-Cache Response Header', '"X-Cache: Miss from cloudfront" (lần đầu lấy từ S3) -> "X-Cache: Hit from cloudfront" (lần sau lấy từ Edge)'],
            ['CloudFront Invalidation', 'Thao tác xóa cache chủ động khi deploy code mới (vd: invalidate "/index.html" hoặc "/*") để người dùng nhận ngay bản mới']
          ]
        },
        keyPointsEn: [
          'Creating a distribution: select origin domain (S3 bucket or ALB) and configure viewer protocol policy (Redirect HTTP to HTTPS).',
          'Enforcing OAC: bucket remains completely private to public internet; only CloudFront service principal can read objects.',
          'Cache verification: inspect browser network tab response headers to verify X-Cache transitions from Miss to Hit.',
          'Invalidation: forces CloudFront edge caches to discard cached objects and fetch fresh versions from origin on the next request.',
          'Cost of Invalidation: first 1,000 invalidation paths each month are free; subsequent paths incur small charges.'
        ],
        keyPointsVi: [
          'Tạo Distribution: chọn domain nguồn (S3 hoặc ALB) và cấu hình giao thức người xem (Chuyển hướng tự động HTTP sang HTTPS).',
          'Thiết lập OAC: S3 bucket hoàn toàn private với Internet bên ngoài; chỉ duy nhất dịch vụ CloudFront mới có quyền đọc tệp.',
          'Kiểm tra Cache: mở Network tab trên trình duyệt kiểm tra header X-Cache chuyển từ "Miss from cloudfront" sang "Hit from cloudfront".',
          'Invalidation: buộc các Edge Location trên toàn cầu hủy bỏ bản cache cũ và lấy lại bản mới nhất từ server gốc trong lần truy cập kế tiếp.',
          'Chi phí Invalidation: 1.000 đường dẫn invalidation đầu tiên mỗi tháng hoàn toàn miễn phí; sau đó tính phí nhỏ theo lượt.'
        ]
      },
      {
        id: 'lec-139',
        number: 139,
        titleEn: 'S3 Transfer Acceleration',
        titleVi: 'S3 Transfer Acceleration (Tăng tốc tải lên S3 qua Edge Location)',
        summaryEn: 'Amazon S3 Transfer Acceleration enables fast, easy, and secure transfers of files over long distances between your client and an S3 bucket. Data enters AWS at the nearest Edge Location and travels to S3 over AWS private backbone network.',
        summaryVi: 'Amazon S3 Transfer Acceleration giúp truyền tải tệp nhanh chóng, dễ dàng và an toàn qua khoảng cách địa lý xa giữa máy khách và S3 bucket. Dữ liệu đi vào AWS tại Edge Location gần nhất rồi di chuyển về S3 qua mạng cáp quang riêng của AWS.',
        table: {
          headers: ['Tiêu chí so sánh', 'Tải lên S3 thông thường', 'S3 Transfer Acceleration'],
          rows: [
            ['Tuyến đường truyền tải', 'Đi hoàn toàn qua mạng Internet công cộng từ máy khách tới Region chứa S3 bucket', 'Đi một đoạn ngắn qua Internet tới Edge Location gần nhất, sau đó đi qua mạng cáp quang riêng của AWS'],
            ['Độ ổn định & Tốc độ', 'Dễ bị nghẽn mạng Internet, độ trễ cao khi khoảng cách xa (vd: từ Tokyo lên S3 ở Ireland)', 'Tốc độ tăng thêm 50% đến 500%, độ trễ thấp và băng thông cực kỳ ổn định'],
            ['Tên miền đích', 'bucket-name.s3.amazonaws.com', 'bucket-name.s3-accelerate.amazonaws.com'],
            ['Chi phí', 'Chỉ tính phí lưu trữ và request S3 tiêu chuẩn', 'Tính thêm một khoản phí tăng tốc nhỏ trên mỗi GB truyền tải']
          ]
        },
        keyPointsEn: [
          'Leverages AWS Edge Locations to accelerate uploads to Amazon S3.',
          'Endpoint changes from standard S3 URL to bucketname.s3-accelerate.amazonaws.com.',
          'Data travels over AWS private, optimized, fiber-optic backbone network instead of congested public internet.',
          'Speed comparison tool provided by AWS demonstrates 50% to 500% upload speed improvements.',
          'Exam keyword: "speed up uploads of large files to S3 across continents" -> S3 Transfer Acceleration.'
        ],
        keyPointsVi: [
          'Tận dụng mạng lưới Edge Location của AWS để tăng tốc tải file lên Amazon S3.',
          'Đổi đường dẫn đích từ URL S3 thông thường sang bucketname.s3-accelerate.amazonaws.com.',
          'Dữ liệu di chuyển qua mạng cáp quang riêng biệt, tối ưu và bảo mật của AWS thay vì mạng Internet công cộng hay nghẽn.',
          'AWS cung cấp công cụ Speed Comparison Test chứng minh tốc độ tải tăng từ 50% đến 500% cho các vị trí ở xa.',
          'Từ khóa đề thi: "tăng tốc tải file lớn lên S3 từ khắp các châu lục trên thế giới" -> chọn ngay S3 Transfer Acceleration.'
        ],
        isCore: true
      },
      {
        id: 'lec-140',
        number: 140,
        titleEn: 'AWS Global Accelerator',
        titleVi: 'AWS Global Accelerator & So sánh với Amazon CloudFront',
        summaryEn: 'AWS Global Accelerator improves availability and performance of applications with local or global users using AWS private network infrastructure and 2 static Anycast IP addresses. Critical comparison with CloudFront on protocols, caching, and use cases.',
        summaryVi: 'AWS Global Accelerator tăng cường tính sẵn sàng và hiệu năng cho ứng dụng có người dùng địa phương hoặc toàn cầu bằng cách sử dụng mạng lưới cáp riêng của AWS và 2 địa chỉ IP Anycast tĩnh. Bài học phân tích sâu sự khác biệt cốt lõi giữa Global Accelerator và CloudFront.',
        table: {
          headers: ['Đặc điểm so sánh', 'Amazon CloudFront', 'AWS Global Accelerator'],
          rows: [
            ['Bộ nhớ đệm (Caching)', 'CÓ LƯU CACHE tệp tĩnh và phản hồi tại Edge Locations', 'HOÀN TOÀN KHÔNG LƯU CACHE (No caching at all)'],
            ['Giao thức hỗ trợ', 'Tối ưu cho HTTP, HTTPS, WebSocket', 'Hỗ trợ cả TCP VÀ UDP (HTTP, HTTPS, Gaming, VoIP, IoT)'],
            ['Địa chỉ IP cung cấp', 'Địa chỉ IP động thay đổi theo từng Edge Location', 'Cung cấp đúng 2 ĐỊA CHỈ IP ANYCAST TĨNH duy nhất trên toàn cầu'],
            ['Đích đến hỗ trợ (Endpoints)', 'S3 bucket, ALB, EC2, hoặc máy chủ HTTP bất kỳ', 'Application Load Balancer (ALB), Network Load Balancer (NLB), EC2, Elastic IP'],
            ['Cơ chế bảo vệ DDoS', 'Tích hợp AWS Shield Standard và AWS WAF', 'Tích hợp AWS Shield Standard chống DDoS'],
            ['Trường hợp sử dụng lý tưởng', 'Website, xem phim trực tuyến, tệp ảnh/video tĩnh, tăng tốc API', 'Chơi game trực tuyến (UDP), thoại video VoIP, IoT, ứng dụng tài chính cần IP tĩnh cố định']
          ]
        },
        keyPointsEn: [
          '2 static Anycast IPv4 addresses serve as a single, unchanging entry point for your application globally.',
          'Anycast routing: traffic enters the AWS edge location closest to the user and travels across AWS private fiber network to endpoints.',
          'No caching: all packets are forwarded directly and quickly to the origin.',
          'Health checks and fast regional failover: automatically detects unhealthy regions and redirects traffic to healthy endpoints in under 1 minute.',
          'Consistent performance: eliminates packet jitter and internet routing hops for latency-sensitive workloads like real-time gaming, VoIP, and IoT.',
          'Exam keyword: "improve TCP/UDP performance with 2 static Anycast IPs", "non-HTTP protocol global acceleration", "no caching" -> AWS Global Accelerator.'
        ],
        keyPointsVi: [
          '2 địa chỉ IP Anycast tĩnh đóng vai trò là một điểm vào duy nhất, cố định không đổi cho toàn bộ ứng dụng trên thế giới.',
          'Định tuyến Anycast: gói tin đi vào Edge Location gần người dùng nhất và di chuyển hoàn toàn trên mạng cáp quang riêng của AWS tới máy chủ đích.',
          'Hoàn toàn không có cache: tất cả gói tin được chuyển tiếp trực tiếp, nguyên vẹn tới máy chủ gốc.',
          'Health check và tự động chuyển vùng cực nhanh: tự động phát hiện Region bị lỗi và chuyển hướng lưu lượng sang Region khỏe mạnh trong chưa đầy 1 phút.',
          'Hiệu năng ổn định tuyệt đối: loại bỏ tình trạng giật lag mạng (jitter) và số bước nhảy router trên Internet, cực kỳ tối ưu cho game online và VoIP.',
          'Từ khóa đề thi: "tăng tốc ứng dụng TCP/UDP với 2 địa chỉ IP Anycast tĩnh", "tăng tốc toàn cầu không dùng cache", "giao thức phi HTTP" -> chọn ngay AWS Global Accelerator.'
        ],
        isCore: true
      },
      {
        id: 'lec-141',
        number: 141,
        titleEn: 'AWS Outposts',
        titleVi: 'AWS Outposts (Mang trọn bộ phần cứng & Dịch vụ AWS vào Data Center nội bộ)',
        summaryEn: 'AWS Outposts brings native AWS infrastructure, services, APIs, and tools to virtually any customer on-premises data center or co-location space for a truly consistent hybrid experience.',
        summaryVi: 'AWS Outposts mang hạ tầng, dịch vụ, API và các công cụ điện toán đám mây nguyên bản của AWS đặt trực tiếp bên trong trung tâm dữ liệu tại chỗ (On-premises Data Center) của doanh nghiệp để tạo ra trải nghiệm Hybrid Cloud đồng nhất tuyệt đối.',
        table: {
          headers: ['Khía cạnh của AWS Outposts', 'Mô tả chi tiết', 'Ý nghĩa đối với doanh nghiệp'],
          rows: [
            ['Hình thức phần cứng', 'Tủ rack máy chủ 42U hoàn chỉnh được thiết kế và chế tạo bởi AWS', 'Do kỹ sư AWS trực tiếp vận chuyển, lắp đặt vào phòng máy và quản lý vận hành'],
            ['Dịch vụ AWS chạy trên Outposts', 'Amazon EC2, EBS, ECS, EKS, RDS, S3 on Outposts', 'Sử dụng cùng một bộ API, CLI, Console và SDK y hệt như trên Cloud'],
            ['Trường hợp sử dụng #1: Độ trễ siêu thấp', 'Ứng dụng nội bộ cần kết nối tới thiết bị sản xuất hoặc hệ thống cũ với độ trễ <1ms', 'Không thể chuyển ứng dụng lên Cloud vì độ trễ đường truyền Internet không đáp ứng được'],
            ['Trường hợp sử dụng #2: Tuân thủ dữ liệu', 'Quy định pháp lý ngặt nghèo (Data Residency/Sovereignty) bắt buộc dữ liệu không được rời khỏi trụ sở', 'Dữ liệu được lưu trữ và xử lý hoàn toàn vật lý tại cơ sở của doanh nghiệp'],
            ['Mô hình trách nhiệm chung', 'AWS chịu trách nhiệm phần cứng, bảo trì, cập nhật. Khách hàng chịu bảo mật vật lý phòng máy, điện, làm mát và mạng nội bộ', 'Giúp phòng IT doanh nghiệp rảnh tay không phải bảo trì phần cứng server phức tạp']
          ]
        },
        keyPointsEn: [
          'Physical AWS hardware: 42U server racks delivered, installed, and maintained by AWS personnel in your data center.',
          'Native AWS experience: same console, APIs, IAM, CloudWatch, and automation tools as the cloud.',
          'Supports EC2 instances, EBS volumes, S3 on Outposts, RDS on Outposts, and container services (ECS/EKS).',
          'Primary drivers: ultra-low latency (<1 ms) to existing on-premises legacy systems, local data processing, and strict regulatory data residency laws.',
          'Shared responsibility: AWS manages hardware, hypervisors, and service updates; customer provides physical room security, power, HVAC, and network uplinks.',
          'Exam keyword: "deploy AWS hardware/racks inside your private data center", "data residency compliance" -> AWS Outposts.'
        ],
        keyPointsVi: [
          'Phần cứng vật lý AWS: tủ rack 42U được đội ngũ kỹ sư AWS trực tiếp chuyển đến, cắm điện, đấu mạng và bảo trì tại phòng máy của bạn.',
          'Trải nghiệm AWS nguyên bản: dùng chung giao diện Console, API, IAM, CloudWatch và công cụ tự động hóa y hệt như trên Cloud.',
          'Hỗ trợ đầy đủ: máy ảo EC2, ổ cứng EBS, S3 on Outposts, cơ sở dữ liệu RDS on Outposts và container ECS/EKS.',
          'Động lực cốt lõi: yêu cầu độ trễ cực thấp (<1 mili-giây) tới dây chuyền sản xuất, xử lý dữ liệu tại chỗ, và luật pháp bắt buộc lưu trữ dữ liệu nội địa.',
          'Mô hình trách nhiệm: AWS quản lý phần cứng, ảo hóa và cập nhật bản vá; khách hàng chịu trách nhiệm bảo vệ cửa phòng máy, nguồn điện, điều hòa làm mát và đường truyền mạng.',
          'Từ khóa đề thi: "triển khai tủ rack máy chủ AWS trong trung tâm dữ liệu tại chỗ", "tuân thủ lưu trữ dữ liệu tại chỗ (Data Residency)" -> chọn ngay AWS Outposts.'
        ],
        isCore: true
      },
      {
        id: 'lec-142',
        number: 142,
        titleEn: 'AWS Wavelength',
        titleVi: 'AWS Wavelength (Điện toán rìa nhúng vào mạng viễn thông 5G)',
        summaryEn: 'AWS Wavelength embeds AWS compute and storage services within telecommunications providers 5G networks, enabling developers to build applications that deliver single-digit millisecond latencies to mobile devices and end users.',
        summaryVi: 'AWS Wavelength nhúng trực tiếp các dịch vụ điện toán và lưu trữ của AWS vào bên trong các trung tâm dữ liệu mạng viễn thông 5G của các nhà mạng viễn thông, cho phép lập trình viên xây dựng ứng dụng với độ trễ cực thấp chỉ vài mili-giây tới thiết bị di động 5G.',
        table: {
          headers: ['Đặc điểm của AWS Wavelength', 'Chi tiết kỹ thuật', 'Lợi ích thực tế'],
          rows: [
            ['Vị trí đặt máy chủ (Wavelength Zones)', 'Nằm bên trong mạng 5G của các nhà mạng viễn thông (Verizon, Vodafone, KDDI, SK Telecom)', 'Lưu lượng từ điện thoại 5G tới máy chủ không cần đi ra ngoài mạng Internet công cộng'],
            ['Độ trễ mạng đạt được', 'Độ trễ ở mức một con số mili-giây (Single-digit millisecond: từ 1ms đến 10ms)', 'Phản hồi gần như tức thì thời gian thực'],
            ['Các dịch vụ AWS hỗ trợ', 'Amazon EC2, EBS, VPC, ECS, EKS', 'Lập trình viên viết code và quản lý hạ tầng tương tự như trên AWS thông thường'],
            ['Ứng dụng thực tế lý tưởng', 'Xe tự hành / xe thông minh kết nối mạng, Robot công nghiệp, Thiết bị bay không người lái, Game tương tác AR/VR, Phẫu thuật y tế từ xa', 'Xử lý hình ảnh và dữ liệu cảm biến thời gian thực mà không bị trễ khung hình']
          ]
        },
        keyPointsEn: [
          'Wavelength Zones are AWS infrastructure deployments embedded inside telecommunication 5G network edge locations.',
          'Traffic from 5G devices reaches AWS compute without leaving the telecommunications network (bypasses public internet routing hops).',
          'Delivers single-digit millisecond latencies (1-10 ms) to mobile 5G devices.',
          'Use cases: Connected autonomous vehicles, smart factories, AR/VR streaming, real-time gaming, and healthcare telemedicine.',
          'Exam keyword: "single-digit millisecond latency to mobile devices", "deploy compute in 5G telecommunication networks" -> AWS Wavelength.'
        ],
        keyPointsVi: [
          'Wavelength Zone là hạ tầng của AWS được triển khai bên trong các điểm biên của mạng viễn thông 5G.',
          'Lưu lượng từ thiết bị 5G truyền thẳng đến máy chủ AWS mà không cần đi qua mạng Internet công cộng (loại bỏ các nút thắt mạng).',
          'Đạt mức độ trễ siêu thấp chỉ từ 1 đến 10 mili-giây (Single-digit ms) tới các thiết bị di động.',
          'Ứng dụng tiêu biểu: Xe tự hành thông minh, tự động hóa nhà máy, phát trực tiếp thực tế ảo AR/VR, game di động thời gian thực và y tế thông minh.',
          'Từ khóa đề thi: "độ trễ vài mili-giây (single-digit ms) cho thiết bị di động", "triển khai ứng dụng trong mạng viễn thông 5G" -> chọn ngay AWS Wavelength.'
        ],
        isCore: true
      },
      {
        id: 'lec-143',
        number: 143,
        titleEn: 'AWS Local Zones',
        titleVi: 'AWS Local Zones (Đưa tài nguyên AWS sát các siêu đô thị lớn)',
        summaryEn: 'AWS Local Zones extend AWS Regions to place compute, storage, database, and other select AWS services close to large population centers, industry, and IT hubs where no AWS Region currently exists.',
        summaryVi: 'AWS Local Zones mở rộng các AWS Region để đưa tài nguyên máy chủ, lưu trữ, cơ sở dữ liệu và các dịch vụ AWS đến gần các trung tâm dân cư, tài chính, công nghiệp lớn nơi hiện chưa có AWS Region chính thức.',
        table: {
          headers: ['Khía cạnh so sánh', 'AWS Region', 'AWS Local Zone'],
          rows: [
            ['Quy mô & Cấu trúc', 'Cụm lớn gồm tối thiểu 3 Availability Zone (AZ) độc lập đầy đủ mọi dịch vụ', 'Một vùng mở rộng gắn với một Region mẹ, cung cấp các dịch vụ cốt lõi (EC2, EBS, VPC, ECS)'],
            ['Vị trí địa lý', 'Đặt tại các trung tâm dữ liệu quy mô lớn (vd: Northern Virginia, Oregon, Tokyo)', 'Đặt sát các thành phố lớn (vd: Los Angeles, Chicago, Dallas, Houston, Boston, Atlanta)'],
            ['Độ trễ mục tiêu', 'Độ trễ thấp giữa các AZ trong cùng 1 Region (<1ms), nhưng xa người dùng ở các thành phố lân cận', 'Đem lại độ trễ dưới 10 mili-giây (<10ms) cho người dùng cuối và hệ thống trong thành phố đó'],
            ['Kết nối tới Region mẹ', 'Là trung tâm chính', 'Kết nối thông suốt và an toàn qua mạng cáp quang riêng tốc độ cao của AWS với Region mẹ']
          ]
        },
        keyPointsEn: [
          'Extends AWS Region to place resources closer to end users in metropolitan areas where no AWS Region exists.',
          'Delivers sub-10 millisecond latency to local users and on-premises IT systems in that city.',
          'Seamless extension of the parent Region: uses the same VPC, subnets, and IAM permissions.',
          'Provides core services: EC2 instances, EBS volumes, ECS, and direct connection back to the parent Region.',
          'Use cases: Video editing/rendering, financial trading applications, local live streaming, and high-performance computing in specific cities.',
          'Exam keyword: "deploy compute close to users in major metropolitan areas (<10ms latency) without an AWS Region" -> AWS Local Zones.'
        ],
        keyPointsVi: [
          'Mở rộng của AWS Region nhằm đưa tài nguyên tới gần người dùng ở các thành phố lớn chưa có AWS Region.',
          'Cung cấp độ trễ dưới 10 mili-giây (<10ms) cho người dùng địa phương và các hệ thống IT tại thành phố đó.',
          'Phần mở rộng liền mạch của Region mẹ: dùng chung VPC, subnet và phân quyền IAM.',
          'Cung cấp các dịch vụ cốt lõi: máy ảo EC2, ổ cứng EBS, container ECS và kết nối tốc độ cao về Region mẹ.',
          'Ứng dụng tiêu biểu: Biên tập video/render đồ họa thời gian thực, giao dịch tài chính chứng khoán, livestream địa phương.',
          'Từ khóa đề thi: "triển khai compute gần người dùng ở các đô thị lớn (<10ms) chưa có AWS Region" -> chọn ngay AWS Local Zones.'
        ],
        isCore: true
      },
      {
        id: 'lec-144',
        number: 144,
        titleEn: 'Global Applications Architecture Patterns',
        titleVi: 'Các mô hình Kiến trúc Ứng dụng Toàn cầu (Design Patterns)',
        summaryEn: 'Comprehensive architectural patterns for building multi-region, resilient, and ultra-high-performance global systems: Active-Passive Disaster Recovery, Active-Active Multi-Region, Static Web Edge Distribution, and Global Dynamic API Acceleration.',
        summaryVi: 'Tổng hợp các mô hình kiến trúc chuẩn mực để xây dựng hệ thống toàn cầu đa Region, sẵn sàng cao và hiệu năng tối đa: Khắc phục thảm họa Active-Passive, Đa vùng Active-Active, Phân phối web tĩnh tại Edge, và Tăng tốc API động toàn cầu.',
        table: {
          headers: ['Mô hình kiến trúc', 'Thành phần dịch vụ AWS kết hợp', 'Đặc điểm vận hành & Khả năng phục hồi'],
          rows: [
            ['Active-Passive Multi-Region (DR)', 'Route 53 Failover + Health Check, S3 CRR, RDS Read Replica / Aurora Global DB', 'Region chính phục vụ người dùng. Khi gặp sự cố thảm họa, Route 53 tự động chuyển hướng sang Region phụ (RTO/RPO ngắn)'],
            ['Active-Active Multi-Region', 'Route 53 Latency Routing, DynamoDB Global Tables, Application Load Balancers', 'Cả hai Region đều nhận lưu lượng đọc/ghi đồng thời. Dữ liệu đồng bộ 2 chiều tức thì, độ trễ tối thiểu cho mọi người dùng'],
            ['Static Web at Edge', 'Amazon Route 53 Alias + CloudFront Distribution + S3 Bucket (OAC)', 'Trang web tĩnh được cache tại hàng trăm Edge Location toàn cầu, bảo mật tuyệt đối cho S3, chi phí cực thấp'],
            ['Dynamic API Acceleration', 'AWS Global Accelerator + Multi-Region ALBs + Auto Scaling EC2 Fleets', '2 IP Anycast tĩnh cố định, gói tin TCP/UDP đi qua cáp quang nội bộ AWS, loại bỏ hoàn toàn hiện tượng nghẽn mạng Internet']
          ]
        },
        keyPointsEn: [
          'Pattern 1: Active-Passive DR relies on Route 53 Failover Routing and asynchronous database replication (Aurora Global Database / RDS Read Replicas).',
          'Pattern 2: Active-Active Multi-Region provides zero downtime and sub-second latency worldwide using DynamoDB Global Tables and Route 53 Latency-based routing.',
          'Pattern 3: Secure static web hosting combines S3, CloudFront with OAC, and Route 53 Alias record pointing root domain to CloudFront.',
          'Pattern 4: Real-time gaming and VoIP architectures leverage AWS Global Accelerator with 2 Anycast IPs pointing to ALBs across multiple Regions.'
        ],
        keyPointsVi: [
          'Mô hình 1: Active-Passive DR dựa vào Route 53 Failover Routing và sao chép database bất đồng bộ (Aurora Global Database hoặc RDS Read Replica).',
          'Mô hình 2: Active-Active Multi-Region đảm bảo thời gian gián đoạn bằng 0 và độ trễ thấp nhất thế giới nhờ DynamoDB Global Tables và Route 53 Latency Routing.',
          'Mô hình 3: Lưu trữ web tĩnh an toàn tuyệt đối kết hợp S3, CloudFront với OAC, và Route 53 Alias trỏ tên miền gốc vào CloudFront.',
          'Mô hình 4: Ứng dụng game thời gian thực và thoại VoIP tận dụng AWS Global Accelerator với 2 IP Anycast trỏ về các ALB ở nhiều Region.'
        ],
        isCore: true
      },
      {
        id: 'lec-145',
        number: 145,
        titleEn: 'Leveraging Global Infrastructure Summary',
        titleVi: 'Bảng tra cứu ma trận quyết định Hạ tầng Toàn cầu của AWS',
        summaryEn: 'Master exam decision matrix summarizing Route 53, CloudFront, S3 Transfer Acceleration, Global Accelerator, Outposts, Wavelength, and Local Zones with direct keywords for the exam.',
        summaryVi: 'Ma trận quyết định toàn diện tổng kết Route 53, CloudFront, S3 Transfer Acceleration, Global Accelerator, Outposts, Wavelength và Local Zones với bộ từ khóa trúng tủ cho bài thi chứng chỉ AWS.',
        table: {
          headers: ['Nếu đề bài thi yêu cầu...', 'Dịch vụ AWS bạn cần chọn ngay', 'Từ khóa nhận diện cốt lõi (Keywords)'],
          rows: [
            ['Dịch vụ DNS quản lý có cam kết 100% SLA, chuyển hướng người dùng theo độ trễ hoặc thảm họa', 'Amazon Route 53', 'DNS, Port 53, 100% SLA, Alias Record, Routing Policies'],
            ['Lưu cache nội dung web, ảnh, video tĩnh tại các Edge Location để tăng tốc độ đọc và chống DDoS', 'Amazon CloudFront', 'CDN, Cache at edge, TTL, Origin Access Control (OAC), Invalidation'],
            ['Tăng tốc độ tải file lớn lên S3 từ khắp các châu lục bằng cách đẩy qua Edge Location gần nhất', 'Amazon S3 Transfer Acceleration', 'Fast upload to S3, S3 accelerate URL, 50-500% speedup'],
            ['Tăng tốc ứng dụng TCP/UDP, KHÔNG CÓ CACHE, cung cấp 2 địa chỉ IP Anycast tĩnh cố định', 'AWS Global Accelerator', 'No caching, 2 static Anycast IPs, TCP/UDP, Gaming, VoIP'],
            ['Triển khai tủ rack phần cứng máy chủ AWS bên trong Data Center tại chỗ của công ty (Data residency)', 'AWS Outposts', 'Hardware rack in private data center, on-premises hybrid, data residency'],
            ['Độ trễ siêu thấp chỉ vài mili-giây (single-digit ms) cho thiết bị di động kết nối mạng 5G', 'AWS Wavelength', 'Telecommunication 5G network edge, single-digit ms, autonomous vehicles'],
            ['Đưa tài nguyên máy chủ tới gần người dùng ở các thành phố lớn chưa có Region (<10ms độ trễ)', 'AWS Local Zones', 'Major metropolitan areas without Region, sub-10ms latency, compute closer to cities']
          ]
        },
        keyPointsEn: [
          'Route 53: Authoritative DNS with 100% SLA; supports Simple, Weighted, Latency, Failover, Geolocation, and Multi-Value routing.',
          'CloudFront: Global CDN that CACHES HTTP/HTTPS content at Edge Locations; integrates with OAC, ACM, and WAF.',
          'S3 Transfer Acceleration: Speeds up long-distance uploads to S3 buckets over AWS private network.',
          'Global Accelerator: Optimizes TCP/UDP performance with 2 static Anycast IPs; NO CACHING.',
          'Outposts: Physical AWS racks deployed inside customer data center for hybrid computing and data residency.',
          'Wavelength: Compute deployed inside telecom 5G edge networks for single-digit millisecond latency to mobile devices.',
          'Local Zones: Brings AWS compute and storage close to major cities lacking an AWS Region for sub-10ms latency.'
        ],
        keyPointsVi: [
          'Route 53: Dịch vụ DNS toàn cầu cam kết sẵn sàng 100% SLA; hỗ trợ Simple, Weighted, Latency, Failover, Geolocation và Multi-Value.',
          'CloudFront: Mạng CDN toàn cầu CÓ LƯU CACHE nội dung HTTP/HTTPS tại Edge Location; tích hợp chặt chẽ với OAC, ACM và WAF.',
          'S3 Transfer Acceleration: Tăng tốc độ tải tệp lên S3 từ khoảng cách xa qua mạng cáp quang riêng của AWS.',
          'Global Accelerator: Tối ưu hiệu năng TCP/UDP với 2 địa chỉ IP Anycast tĩnh; HOÀN TOÀN KHÔNG CÓ CACHE.',
          'Outposts: Tủ rack máy chủ AWS vật lý đặt tại data center của doanh nghiệp phục vụ điện toán hybrid và lưu trữ nội bộ.',
          'Wavelength: Đặt máy chủ bên trong rìa mạng viễn thông 5G đạt độ trễ siêu thấp chỉ vài mili-giây cho thiết bị di động.',
          'Local Zones: Đưa máy chủ và ổ đĩa tới gần các siêu đô thị lớn chưa có Region nhằm đạt độ trễ dưới 10ms.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-13',
    sectionNumber: 13,
    titleEn: 'Cloud Integrations (SQS, SNS, Kinesis, Amazon MQ & Decoupling)',
    titleVi: 'Tích hợp Đám mây & Kiến trúc Tách rời (SQS, SNS, Kinesis, Amazon MQ)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Integration Core',
    overviewEn: 'Section 13 covers foundational distributed application integration and decoupling architectures on AWS. Learn how to transition from tightly coupled synchronous systems to resilient, independently scaling asynchronous architectures using Amazon SQS (message queues & FIFO), Amazon SNS (pub/sub notification fan-out), Amazon Kinesis (real-time high-throughput streaming & ingestion), and Amazon MQ (managed open-source message broker for migrations).',
    overviewVi: 'Section 13 trang bị kiến thức chuyên sâu về tích hợp ứng dụng phân tán và kiến trúc tách rời (Decoupling) trên AWS. Hiểu rõ sự khác biệt giữa giao tiếp đồng bộ (gắn kết chặt, dễ quá tải) và bất đồng bộ (mở rộng độc lập), làm chủ 4 dịch vụ tích hợp cốt lõi: Amazon SQS (hàng đợi tin nhắn), Amazon SNS (mô hình thông báo Pub/Sub Fan-out), Amazon Kinesis (truyền luồng dữ liệu lớn thời gian thực) và Amazon MQ (môi giới tin nhắn giao thức mở để di chuyển ứng dụng).',
    quickExamFacts: [
      {
        en: 'Synchronous = direct app-to-app coupling; sudden traffic spikes cause cascading failures. Asynchronous = decoupled via queues/topics/streams so producers and consumers scale independently.',
        vi: 'Đồng bộ = kết nối trực tiếp giữa các ứng dụng; lượng truy cập tăng đột biến dễ gây sập dây chuyền. Bất đồng bộ = tách rời qua queue/topic/stream giúp producer và consumer tự do scale độc lập.',
        isCoreHighlight: true
      },
      {
        en: 'SQS = Pull-based message queue, serverless, unlimited throughput. Retention: default 4 days (max 14 days). Standard (at-least-once, best-effort order) vs FIFO (exactly-once, strict order). "Decoupling" almost always means SQS on the exam.',
        vi: 'SQS = Hàng đợi tin nhắn cơ chế Pull (người nhận chủ động lấy), serverless, throughput không giới hạn. Lưu giữ: mặc định 4 ngày (tối đa 14 ngày). Standard (ít nhất 1 lần, không đảm bảo thứ tự) vs FIFO (chính xác 1 lần, đúng thứ tự). "Decoupling" trong đề thi hầu như luôn chọn SQS.',
        isCoreHighlight: true
      },
      {
        en: 'SNS = Push-based Pub/Sub (Publish/Subscribe); 1 publisher sends to a topic -> Fan-out to millions of subscribers simultaneously (SQS, Lambda, email, SMS, HTTP/S). SNS does NOT store/retain messages long-term.',
        vi: 'SNS = Mô hình Pub/Sub cơ chế Push (đẩy tin tự động); 1 người phát gửi vào Topic -> Fan-out đồng loạt tới hàng triệu người đăng ký (SQS, Lambda, email, SMS, HTTP/S). SNS KHÔNG lưu trữ tin nhắn lâu dài.',
        isCoreHighlight: true
      },
      {
        en: 'Kinesis = Real-time big data streaming, ingestion, and analytics (clickstreams, IoT metrics, gaming logs) at immense scale with sub-second latency.',
        vi: 'Kinesis = Truyền luồng và xử lý dữ liệu lớn (Big Data Streaming) thời gian thực (clickstream, IoT, log game) ở quy mô cực lớn với độ trễ dưới 1 giây.',
        isCoreHighlight: true
      },
      {
        en: 'Amazon MQ = Managed message broker for Apache ActiveMQ & RabbitMQ. Use ONLY when migrating legacy on-premises apps that require traditional open protocols (MQTT, AMQP, STOMP, OpenWire) without rewriting code.',
        vi: 'Amazon MQ = Dịch vụ môi giới tin nhắn quản lý cho ActiveMQ và RabbitMQ. CHỈ dùng khi di chuyển ứng dụng cũ (on-premises) cần giữ nguyên các giao thức mở (MQTT, AMQP, STOMP) mà không muốn viết lại code sang SQS/SNS.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-146',
        number: 146,
        titleEn: 'Cloud Integrations Overview (Decoupling Architecture)',
        titleVi: 'Tổng quan Tích hợp Đám mây & Kiến trúc Tách rời (Decoupling)',
        summaryEn: 'Detailed comparison between Synchronous communication (tight coupling, fragile under load spikes) and Asynchronous integration patterns (decoupled, resilient, scalable) using Queues, Pub/Sub, and Streaming.',
        summaryVi: 'So sánh chi tiết giữa mô hình giao tiếp Đồng bộ (Synchronous - phụ thuộc lẫn nhau, dễ sập khi tải tăng đột biến) và mô hình Bất đồng bộ Tách rời (Asynchronous Decoupling - chống chịu lỗi tốt, mở rộng độc lập) thông qua Hàng đợi (Queue), Pub/Sub và Streaming.',
        table: {
          headers: ['Tiêu chí so sánh', 'Giao tiếp Đồng bộ (Synchronous)', 'Giao tiếp Bất đồng bộ (Asynchronous / Decoupled)'],
          rows: [
            ['Phương thức kết nối', 'Ứng dụng A gọi trực tiếp API của Ứng dụng B (Point-to-Point direct call)', 'Ứng dụng A gửi tin nhắn qua một tầng trung gian (SQS Queue, SNS Topic, Kinesis)'],
            ['Sự phụ thuộc (Coupling)', 'Tightly Coupled: Cả hai ứng dụng phải luôn online cùng lúc để xử lý', 'Loosely Coupled (Tách rời): Ứng dụng B có thể tạm dừng hoặc bảo trì mà A vẫn chạy'],
            ['Khả năng chịu tải đột biến', 'Kém: Nếu A gửi 100,000 req/giây mà B chỉ chịu được 5,000 thì hệ thống B sập và A báo lỗi 504/500', 'Tuyệt vời: Tin nhắn được xếp vào hàng đợi hoặc stream đệm; B xử lý theo tốc độ tối ưu của mình'],
            ['Khả năng mở rộng (Scaling)', 'Phải scale đồng thời cả A và B theo cùng tỷ lệ; rất tốn kém tài nguyên', 'Từng thành phần tự động scale độc lập dựa trên hàng đợi (CloudWatch Queue Depth)'],
            ['Dịch vụ AWS áp dụng', 'Direct HTTP/REST qua ALB, NLB, API Gateway', 'Amazon SQS, Amazon SNS, Amazon Kinesis, Amazon MQ, EventBridge']
          ]
        },
        keyPointsEn: [
          'Tightly coupled synchronous systems fail when downstream services become overloaded or experience outages.',
          'Decoupling introduces a buffer (queue, pub/sub topic, or data stream) between producers and consumers.',
          'Producers send messages at their own rate without waiting for processing completion.',
          'Consumers pull or receive messages and process them at their own pace, scaling dynamically with Auto Scaling.',
          'The 3 main decoupling patterns on AWS: Message Queue (SQS - 1 to 1), Pub/Sub (SNS - 1 to many), and Streaming (Kinesis - real-time big data).'
        ],
        keyPointsVi: [
          'Hệ thống đồng bộ gắn kết chặt chẽ sẽ sập ngay lập tức khi dịch vụ phía sau (downstream) bị nghẽn mạng hoặc quá tải.',
          'Kiến trúc tách rời (Decoupling) chèn một vùng đệm (hàng đợi SQS, topic SNS hoặc stream Kinesis) ở giữa người gửi và người nhận.',
          'Producer (người gửi) đẩy tin nhắn với tốc độ tùy ý mà không cần chờ đợi người nhận phản hồi.',
          'Consumer (người nhận) lấy tin nhắn và xử lý theo tốc độ phù hợp, có thể kích hoạt Auto Scaling để thêm máy chủ khi hàng đợi dày lên.',
          '3 mô hình tách rời kinh điển trên AWS: Hàng đợi (SQS - mô hình 1-1), Pub/Sub (SNS - mô hình 1-nhiều) và Truyền luồng dữ liệu (Kinesis - big data streaming).'
        ],
        isCore: true
      },
      {
        id: 'lec-147',
        number: 147,
        titleEn: 'Amazon SQS Overview (Simple Queue Service)',
        titleVi: 'Tổng quan Amazon SQS (Dịch vụ Hàng đợi Tin nhắn Quản lý)',
        summaryEn: 'Deep-dive into AWS oldest service: Amazon SQS. Fully managed, serverless, pull-based message queue used to decouple application tiers. Covers queue retention, message sizing, Standard vs FIFO queues, and Auto Scaling patterns.',
        summaryVi: 'Đi sâu vào dịch vụ đầu tiên và lâu đời nhất của AWS: Amazon SQS. Dịch vụ hàng đợi tin nhắn serverless theo cơ chế Pull dùng để tách rời các tầng ứng dụng. Phân tích chi tiết thời gian lưu trữ, kích thước tin, so sánh SQS Standard vs SQS FIFO và cơ chế tự động mở rộng theo độ sâu hàng đợi.',
        table: {
          headers: ['Đặc tính kỹ thuật', 'SQS Standard Queue (Mặc định)', 'SQS FIFO Queue (First-In, First-Out)'],
          rows: [
            ['Thứ tự xử lý (Ordering)', 'Best-effort ordering: AWS cố gắng giữ thứ tự nhưng không đảm bảo 100%', 'Strict ordering: Đúng 100% thứ tự tin nhắn gửi vào trước thì xử lý trước'],
            ['Khả năng trùng lặp tin', 'At-least-once delivery: Tin nhắn có thể bị gửi trùng 2 lần trong trường hợp hiếm', 'Exactly-once delivery: Đảm bảo xử lý chính xác 1 lần duy nhất, loại bỏ trùng lặp (Deduplication)'],
            ['Thông lượng (Throughput)', 'Không giới hạn (Unlimited transactions per second)', '300 tin/giây (hoặc tới 3,000 tin/giây nếu dùng cơ chế batching)'],
            ['Tên hàng đợi', 'Tên bất kỳ (Ví dụ: my-queue)', 'BẮT BUỘC phải có đuôi kết thúc bằng ".fifo" (Ví dụ: my-orders.fifo)'],
            ['Trường hợp sử dụng', 'Xử lý tác vụ nền, mã hóa video, gửi email marketing khi không khắt khe về thứ tự', 'Giao dịch ngân hàng, lệnh khớp chứng khoán, đặt mua vé xem phim, thanh toán thương mại điện tử']
          ]
        },
        keyPointsEn: [
          'Serverless & fully managed: No servers to provision or patch; pay only per message sent/polled.',
          'Pull-based architecture: Consumers poll SQS to retrieve messages, process them, and MUST explicitly call DeleteMessage to remove them.',
          'Message retention: Default is 4 days; configurable from 1 minute up to 14 days.',
          'Message size limit: Maximum 256 KB per message (use Amazon SQS Extended Client with S3 for messages up to 2 GB).',
          'Scalability integration: EC2 Auto Scaling groups can scale out/in based on the CloudWatch metric "ApproximateNumberOfMessagesVisible".',
          'Decoupling design pattern: Web servers push user orders to SQS -> Worker EC2 instances poll SQS and process order fulfillment asynchronously.'
        ],
        keyPointsVi: [
          'Serverless & quản lý 100%: Không cần quản lý máy chủ hay cài đặt bản vá; chỉ trả tiền theo số lượng tin nhắn gửi/nhận.',
          'Cơ chế Kéo (Pull-based): Consumer chủ động thăm dò (poll) SQS để lấy tin, xử lý xong BẮT BUỘC phải gọi lệnh DeleteMessage để xóa tin khỏi hàng đợi.',
          'Thời gian lưu giữ tin (Retention): Mặc định là 4 ngày; có thể cấu hình từ 1 phút đến tối đa 14 ngày.',
          'Giới hạn kích thước tin: Tối đa 256 KB mỗi tin nhắn (nếu cần gửi dữ liệu lớn hơn tới 2 GB, dùng SQS Extended Client Library kết hợp với S3).',
          'Tích hợp Auto Scaling: Nhóm máy chủ EC2 Worker có thể tự động thêm máy khi chỉ số CloudWatch "ApproximateNumberOfMessagesVisible" tăng cao.',
          'Mô hình tách rời kinh điển: Web server đẩy đơn hàng vào SQS -> EC2 worker phía sau rút tin từ SQS để xử lý thanh toán/đóng gói bất đồng bộ.'
        ],
        isCore: true
      },
      {
        id: 'lec-148',
        number: 148,
        titleEn: 'Amazon SQS Hands-on & Practical Concepts',
        titleVi: 'Thực hành Amazon SQS & Các khái niệm Vận hành quan trọng',
        summaryEn: 'Hands-on walkthrough of SQS operations: Visibility Timeout, Dead Letter Queues (DLQ), Short Polling vs Long Polling, and Delay Queues.',
        summaryVi: 'Hướng dẫn thực hành các thao tác quản trị trên SQS: Thời gian ẩn tin nhắn (Visibility Timeout), Hàng đợi chứa tin lỗi (Dead Letter Queue - DLQ), Short Polling so với Long Polling, và Hàng đợi hoãn phát tin (Delay Queue).',
        table: {
          headers: ['Khái niệm vận hành', 'Bản chất cơ chế & Thiết lập mặc định', 'Ý nghĩa thực tế & Giá trị trong kỳ thi'],
          rows: [
            ['Visibility Timeout', 'Mặc định 30 giây (cấu hình từ 0s tới 12 giờ). Khi consumer lấy tin, tin nhắn tạm thời bị "ẩn" khỏi các consumer khác', 'Nếu consumer xử lý quá thời gian này mà chưa kịp xóa tin, tin nhắn sẽ hiện lại và bị consumer khác xử lý trùng lặp. Giải pháp: gọi API ChangeMessageVisibility'],
            ['Dead Letter Queue (DLQ)', 'Hàng đợi thứ hai để hứng các tin nhắn bị lỗi sau khi đã thử lại quá ngưỡng Maximum Receives (redrive policy)', 'Ngăn chặn tin nhắn "độc hại" (poison pill message) làm tắc nghẽn hàng đợi vĩnh viễn, giúp kỹ sư dễ dàng kiểm tra và sửa lỗi ứng dụng'],
            ['Long Polling vs Short Polling', 'WaitTimeSeconds từ 1s đến 20s (khuyến nghị 20s). Consumer chờ đến khi có tin nhắn mới trả về thay vì trả lời trống ngay', 'Giảm tối đa số lượng request API rỗng gửi lên SQS, tiết kiệm chi phí vận hành đáng kể và giảm độ trễ tiếp nhận tin'],
            ['Delay Queue', 'Lùi thời điểm hiển thị tin nhắn từ 0 giây tới tối đa 15 phút sau khi producer gửi vào hàng đợi', 'Cho phép các tác vụ phía trước (như lưu DB, kích hoạt thanh toán) có đủ thời gian hoàn tất trước khi worker bắt đầu xử lý']
          ]
        },
        keyPointsEn: [
          'Visibility Timeout (default 30 seconds): While a consumer processes a message, it is invisible to others; consumer must delete the message before the timeout expires.',
          'If processing takes longer, call ChangeMessageVisibility API to extend time and avoid duplicate processing.',
          'Dead Letter Queue (DLQ): Unprocessed messages after a configured number of failed attempts (redrive policy) are routed to a DLQ for debugging.',
          'Long Polling (WaitTimeSeconds = 20s): Dramatically reduces empty API responses, lowering cost and reducing latency compared to Short Polling.',
          'Delay Queue: Delays the delivery of a message for up to 15 minutes upon arrival.'
        ],
        keyPointsVi: [
          'Visibility Timeout (mặc định 30 giây): Khi 1 consumer đang đọc tin, tin nhắn đó bị ẩn với các consumer khác; consumer phải xóa tin trước khi hết giờ.',
          'Nếu tác vụ xử lý mất nhiều thời gian hơn, consumer phải gọi lệnh ChangeMessageVisibility để gia hạn thêm giờ, tránh bị consumer khác xử lý lặp lại.',
          'Dead Letter Queue (DLQ): Sau một số lần thử lại thất bại định trước, tin nhắn lỗi sẽ được tự động chuyển sang DLQ để không làm nghẽn hàng đợi chính.',
          'Long Polling (WaitTimeSeconds = 20 giây): Giảm thiểu các lệnh thăm dò rỗng, giúp tiết kiệm chi phí dịch vụ AWS và giảm độ trễ nhận tin.',
          'Delay Queue: Hoãn thời gian người nhận có thể thấy tin nhắn lên tới tối đa 15 phút kể từ khi gửi vào.'
        ],
        isCore: true
      },
      {
        id: 'lec-149',
        number: 149,
        titleEn: 'Amazon Kinesis Overview (Real-time Streaming)',
        titleVi: 'Tổng quan Amazon Kinesis (Truyền luồng Dữ liệu Thời gian thực)',
        summaryEn: 'Comprehensive guide to real-time big data streaming, ingestion, and real-time processing using Amazon Kinesis services: Kinesis Data Streams, Amazon Data Firehose, and Kinesis Data Analytics (Managed Service for Apache Flink).',
        summaryVi: 'Hướng dẫn toàn diện về nền tảng truyền luồng dữ liệu lớn (Big Data Streaming) thời gian thực của AWS: Kinesis Data Streams, Amazon Data Firehose (trước đây là Kinesis Data Firehose) và Kinesis Data Analytics (Apache Flink).',
        table: {
          headers: ['Dịch vụ Kinesis', 'Chức năng cốt lõi & Cách thức lưu trữ', 'Đích đến / Người tiêu thụ (Destinations)'],
          rows: [
            ['Kinesis Data Streams (KDS)', 'Thu thập và lưu trữ luồng dữ liệu thời gian thực theo cấu trúc Shards (mỗi shard: 1 MB/s in, 2 MB/s out). Giữ dữ liệu từ 1 đến 365 ngày', 'EC2 workers, AWS Lambda functions, Kinesis Client Library (KCL) để xử lý dữ liệu phức tạp theo thời gian thực'],
            ['Amazon Data Firehose', 'Dịch vụ ETL không máy chủ (Serverless), tự động nạp dữ liệu vào kho lưu trữ. KHÔNG lưu trữ dữ liệu vĩnh viễn (gần thời gian thực ~60 giây đệm)', 'Tự động đẩy vào: Amazon S3, Amazon Redshift, Amazon OpenSearch, Splunk, HTTP Custom Endpoints'],
            ['Amazon Managed Service for Apache Flink (Kinesis Data Analytics)', 'Phân tích dữ liệu luồng ngay khi đang di chuyển bằng ngôn ngữ SQL hoặc Apache Flink mà không cần ghi ra đĩa', 'Đẩy kết quả phân tích theo thời gian thực về Dashboard, cảnh báo CloudWatch hoặc lưu trữ vào S3/Redshift']
          ]
        },
        keyPointsEn: [
          'Designed for real-time big data streaming: Application logs, website clickstreams, IoT telemetry data, financial financial tick feeds.',
          'Kinesis Data Streams: Requires shard provisioning (or on-demand mode); retains data records from 24 hours (default) up to 365 days; multiple consumers can read from the same stream.',
          'Amazon Data Firehose: Fully serverless, no shard management; automatically batches, transforms, and loads streaming data into S3, Redshift, or OpenSearch.',
          'Exam shortcut: If you see "real-time streaming big data analytics" -> Kinesis Data Streams. If you see "stream data directly into S3 or Redshift serverless without code" -> Amazon Data Firehose.'
        ],
        keyPointsVi: [
          'Chuyên dụng cho dữ liệu lớn dạng luồng thời gian thực: Log ứng dụng, hành vi click chuột trên web (clickstream), dữ liệu cảm biến IoT, biến động giá tài chính.',
          'Kinesis Data Streams: Vận hành theo Shards (hoặc On-Demand); lưu trữ dữ liệu từ 24 giờ (mặc định) đến 365 ngày; nhiều ứng dụng có thể đọc đồng thời từ 1 stream.',
          'Amazon Data Firehose: Hoàn toàn serverless, không cần quản lý shard; tự động gom cụm, chuyển đổi định dạng và nạp vào S3, Redshift hoặc OpenSearch.',
          'Mẹo thi chứng chỉ: "phân tích dữ liệu luồng thời gian thực" -> chọn Kinesis Data Streams. "nạp dữ liệu luồng tự động vào S3 hoặc Redshift không cần quản lý máy chủ" -> chọn Amazon Data Firehose.'
        ],
        isCore: true
      },
      {
        id: 'lec-150',
        number: 150,
        titleEn: 'Amazon SNS Overview (Simple Notification Service)',
        titleVi: 'Tổng quan Amazon SNS (Dịch vụ Thông báo Pub/Sub 1-nhiều)',
        summaryEn: 'Fully managed publish/subscribe messaging service. Producers publish messages to an SNS Topic, which automatically pushes (fans out) messages to millions of subscribers including SQS queues, Lambda functions, emails, and SMS.',
        summaryVi: 'Dịch vụ phân phối thông báo Pub/Sub (Publish/Subscribe) được quản lý 100%. Người phát (Publisher) gửi 1 tin nhắn vào Topic, hệ thống tự động đẩy (Push/Fan-out) đồng loạt tới hàng triệu người đăng ký (SQS, Lambda, Email, SMS, Webhook).',
        table: {
          headers: ['Khía cạnh so sánh', 'Amazon SQS (Hàng đợi - Pull)', 'Amazon SNS (Thông báo - Push)'],
          rows: [
            ['Mô hình truyền tin', 'Point-to-Point (1 người gửi -> 1 người nhận xử lý)', 'Publish/Subscribe (1 người phát -> nhiều người nhận cùng lúc - Fan-out)'],
            ['Cơ chế nhận tin', 'Pull model: Consumer phải chủ động gửi request hỏi thăm (poll) hàng đợi', 'Push model: SNS tự động đẩy tin nhắn tức thì tới tất cả các subscriber'],
            ['Lưu trữ tin nhắn (Persistence)', 'Có lưu trữ: Tin được lưu an toàn từ 4 đến 14 ngày cho tới khi consumer xóa', 'KHÔNG lưu trữ: Tin được đẩy đi ngay; nếu subscriber không online, tin có thể bị mất (trừ khi có Dead-Letter Queue)'],
            ['Đối tượng nhận tin (Subscribers)', 'Chỉ ứng dụng máy chủ/worker có quyền IAM đọc hàng đợi', 'Hàng đợi SQS, hàm AWS Lambda, Data Firehose, Email, Tin nhắn SMS thoại di động, HTTP/S Endpoints']
          ]
        },
        keyPointsEn: [
          'Pub/Sub architecture: Event-driven notification service where publishers send messages to an SNS Topic.',
          'Push-based delivery: SNS pushes messages directly to subscribers immediately without polling.',
          'Fan-out Pattern: Publish once to SNS Topic -> fan out simultaneously to multiple SQS queues for parallel processing by different services (e.g., billing, fraud detection, shipping).',
          'Subscribers supported: SQS queues, AWS Lambda, Amazon Data Firehose, Email, SMS text messages, Mobile push notifications, and HTTP/HTTPS webhooks.',
          'Message Filtering: Subscribers can define JSON filter policies so they only receive messages matching specific attributes.',
          'Security: Encryption in transit (TLS) and at rest (KMS), access control via SNS Topic Policies.'
        ],
        keyPointsVi: [
          'Kiến trúc Pub/Sub: Dịch vụ thông báo theo sự kiện; người gửi chỉ cần phát tin nhắn vào 1 Topic duy nhất.',
          'Cơ chế Push: SNS tự động đẩy tin tới người nhận ngay lập tức, người nhận không cần tốn tài nguyên thăm dò định kỳ.',
          'Mô hình Fan-out kinh điển: Phát 1 sự kiện vào SNS -> tự động sao chép đẩy vào nhiều hàng đợi SQS khác nhau (thanh toán, kế toán, kho bãi) để xử lý song song độc lập.',
          'Các đối tượng đăng ký hỗ trợ: SQS queue, hàm AWS Lambda, Data Firehose, gửi Email, SMS điện thoại di động, thông báo đẩy ứng dụng di động, HTTP/HTTPS webhooks.',
          'Bộ lọc tin nhắn (Message Filtering): Cho phép từng subscriber định nghĩa bộ lọc JSON để chỉ nhận đúng các tin nhắn mình quan tâm.',
          'Bảo mật: Mã hóa khi truyền (TLS) và mã hóa khi lưu trữ (KMS), kiểm soát quyền truy cập qua SNS Topic Policy.'
        ],
        isCore: true
      },
      {
        id: 'lec-151',
        number: 151,
        titleEn: 'Amazon SNS Hands-on & Fan-Out Architectural Pattern',
        titleVi: 'Thực hành Amazon SNS & Mô hình Kiến trúc Fan-Out kinh điển',
        summaryEn: 'Hands-on steps for creating SNS topics, configuring subscriptions, testing message publishing, and building the resilient SNS + SQS Fan-Out architecture pattern.',
        summaryVi: 'Các bước thực hành tạo SNS Topic, thiết lập các kênh đăng ký (Subscription), gửi tin nhắn thử nghiệm và xây dựng mô hình kiến trúc Fan-Out kết hợp giữa SNS và nhiều hàng đợi SQS.',
        table: {
          headers: ['Bước triển khai', 'Mục tiêu thực hiện trong Console/CLI', 'Lợi ích kiến trúc hệ thống'],
          rows: [
            ['1. Tạo SNS Topic', 'Chọn loại Topic Standard (thông lượng tối đa) hoặc FIFO (đúng thứ tự)', 'Đóng vai trò điểm tập trung nhận mọi sự kiện từ hệ thống (Single Entry Point)'],
            ['2. Thiết lập Subscriptions', 'Đăng ký các đích nhận: Email, SQS Queues, AWS Lambda function', 'Đảm bảo nhiều phân hệ độc lập cùng nhận được thông tin mà không cần sửa code publisher'],
            ['3. Cấu hình SNS Fan-Out', 'Liên kết SNS Topic với 3 SQS Queues: Queue-Fraud, Queue-Shipping, Queue-Analytics', 'Tách rời hoàn toàn: Mỗi team tự quản lý hàng đợi riêng, lỗi ở team Shipping không ảnh hưởng team Fraud'],
            ['4. Xác thực và Thử nghiệm', 'Xác nhận Subscription qua link email hoặc phân quyền SQS Policy cho phép SNS ghi tin', 'Tin nhắn gửi vào Topic được phân phối tức thì và an toàn tới mọi hệ thống liên kết']
          ]
        },
        keyPointsEn: [
          'SNS + SQS Fan-Out pattern is one of the most tested architectures on AWS certification exams.',
          'In Fan-Out: A single event published to SNS is copied and sent to multiple dedicated SQS queues simultaneously.',
          'Benefits: Fault tolerance (if one worker queue crashes, other queues continue), asynchronous parallel processing, and independent scaling.',
          'No data loss: SQS provides persistence and buffering that SNS alone lacks.',
          'SNS Topic Policy must grant permission for the topic to send messages to the target SQS queues.'
        ],
        keyPointsVi: [
          'Mô hình SNS + SQS Fan-Out là một trong những kiến trúc xuất hiện nhiều nhất trong đề thi AWS Cloud Practitioner.',
          'Nguyên lý Fan-Out: Một sự kiện đơn lẻ được đẩy vào SNS Topic sẽ được tự động nhân bản và gửi tới nhiều hàng đợi SQS chuyên biệt cùng lúc.',
          'Lợi ích vượt trội: Chống chịu lỗi cao (nếu dịch vụ đọc SQS của đội kho bị sập thì đội thanh toán vẫn chạy bình thường), xử lý song song và scale độc lập.',
          'Không lo mất tin: Nhờ có các hàng đợi SQS đệm phía sau, tin nhắn được bảo lưu an toàn 14 ngày ngay cả khi hệ thống xử lý tạm ngừng.',
          'Cần cấp quyền trong SQS Access Policy để cho phép SNS Topic có quyền đẩy tin (SendMessage) vào hàng đợi SQS.'
        ],
        isCore: true
      },
      {
        id: 'lec-152',
        number: 152,
        titleEn: 'Amazon MQ Overview (Managed Open-Source Message Broker)',
        titleVi: 'Tổng quan Amazon MQ (Môi giới Tin nhắn Quản lý cho Giao thức Mở)',
        summaryEn: 'Managed message broker service for Apache ActiveMQ and RabbitMQ. Designed for migrating legacy applications that rely on industry-standard open messaging protocols without rewriting code.',
        summaryVi: 'Dịch vụ môi giới tin nhắn được quản lý toàn diện cho Apache ActiveMQ và RabbitMQ. Giải pháp hoàn hảo để di chuyển các ứng dụng doanh nghiệp truyền thống (on-premises) phụ thuộc vào giao thức mở sang đám mây mà không cần viết lại mã nguồn.',
        table: {
          headers: ['Tiêu chí so sánh', 'Amazon SQS / SNS (AWS-Native Cloud Services)', 'Amazon MQ (Managed Open-Source Broker)'],
          rows: [
            ['Kiến trúc nền tảng', 'Serverless 100%, không cần chọn kích thước máy chủ, quy mô tự động vô hạn', 'Chạy trên máy chủ chuyên dụng (EC2-based instances do AWS quản lý)'],
            ['Giao thức giao tiếp (Protocols)', 'Giao thức độc quyền AWS qua REST/HTTPS APIs', 'Hỗ trợ các giao thức chuẩn mở quốc tế: MQTT, AMQP, STOMP, OpenWire, WSS'],
            ['Tính sẵn sàng cao (High Availability)', 'Tự động sao chép đa vùng AZ mặc định', 'Hỗ trợ kiến trúc Active/Standby Multi-AZ tự động chuyển đổi dự phòng (failover)'],
            ['Kịch bản sử dụng (When to use)', 'Xây dựng ứng dụng mới (Cloud-native) trên AWS', 'Di chuyển ứng dụng cũ (Lift-and-Shift) từ Data Center tại chỗ lên AWS cần giữ nguyên code']
          ]
        },
        keyPointsEn: [
          'Managed service for open-source message brokers: Apache ActiveMQ and RabbitMQ.',
          'Supports industry-standard open protocols: AMQP, MQTT, OpenWire, STOMP, and WSS.',
          'High Availability: Configurable with Active/Standby broker deployment with shared storage across multiple AZs.',
          'Primary Use Case: Migrating existing on-premises applications to the cloud without rewriting their messaging layers.',
          'Exam Rule of Thumb: If the question mentions "Apache ActiveMQ", "RabbitMQ", "MQTT", or "AMQP protocol migration" -> choose Amazon MQ. If building new cloud-native apps -> choose SQS or SNS.'
        ],
        keyPointsVi: [
          'Dịch vụ quản lý cho các hệ thống môi giới tin nhắn mã nguồn mở: Apache ActiveMQ và RabbitMQ.',
          'Hỗ trợ đầy đủ các giao thức mở tiêu chuẩn công nghiệp: AMQP, MQTT, OpenWire, STOMP và WSS.',
          'Tính sẵn sàng cao (HA): Hỗ trợ mô hình Active/Standby trải dài trên nhiều Availability Zone với bộ nhớ lưu trữ dùng chung tự động chuyển vùng khi có sự cố.',
          'Mục đích sử dụng chính: Di chuyển ứng dụng có sẵn từ trung tâm dữ liệu tại chỗ lên AWS mà không phải đập đi viết lại tầng truyền tin.',
          'Quy tắc vàng trong phòng thi: Đề bài xuất hiện các từ khóa "Apache ActiveMQ", "RabbitMQ", "giao thức MQTT", "AMQP" hoặc "di chuyển giữ nguyên giao thức" -> chọn ngay Amazon MQ. Nếu xây dựng ứng dụng mới trên đám mây -> ưu tiên SQS hoặc SNS.'
        ],
        isCore: true
      },
      {
        id: 'lec-153',
        number: 153,
        titleEn: 'Cloud Integrations Summary & Exam Decision Matrix',
        titleVi: 'Tổng kết Tích hợp Đám mây & Ma trận Quyết định Đề thi',
        summaryEn: 'Definitive comparative matrix across SQS, SNS, Kinesis, and Amazon MQ with direct scenario mappings and high-frequency exam questions.',
        summaryVi: 'Ma trận đối chiếu tổng lực giữa 4 dịch vụ tích hợp đám mây SQS, SNS, Kinesis và Amazon MQ với các tình huống đề thi thực tế và bộ từ khóa quyết định chính xác 100%.',
        table: {
          headers: ['Dịch vụ AWS', 'Mô hình hoạt động', 'Giao thức / Cơ chế nhận tin', 'Thời gian lưu giữ', 'Từ khóa quyết định trong đề thi'],
          rows: [
            ['Amazon SQS', 'Queue (Hàng đợi 1-1)', 'Pull model (Consumer chủ động lấy và xóa tin)', '1 phút - 14 ngày (Mặc định 4 ngày)', 'Decouple applications, buffer requests, worker queue, Standard vs FIFO, DLQ'],
            ['Amazon SNS', 'Pub/Sub (Thông báo 1-nhiều)', 'Push model (Tự động đẩy tin tới mọi subscriber)', 'Không lưu giữ (Đẩy tin tức thì)', 'Pub/sub, Fan-out pattern, push notification, SMS/Email alert, 1 to many'],
            ['Amazon Kinesis', 'Data Streaming (Truyền luồng dữ liệu)', 'Pull / Push qua Shards hoặc Firehose nạp S3', '24 giờ - 365 ngày', 'Real-time big data streaming, clickstream, IoT telemetry, low-latency analytics'],
            ['Amazon MQ', 'Open-source Broker', 'Open protocols: MQTT, AMQP, STOMP, OpenWire', 'Theo cấu hình broker (ActiveMQ/RabbitMQ)', 'Migrate from on-premises, keep existing protocol, ActiveMQ, RabbitMQ']
          ]
        },
        keyPointsEn: [
          'Amazon SQS: 1-to-1 Queue, Pull-based, 4-14 days retention; used for asynchronous worker decoupling and traffic buffering.',
          'Amazon SNS: 1-to-many Pub/Sub, Push-based, no retention; used for immediate event notification and Fan-out to multiple systems.',
          'Amazon Kinesis: Real-time data streaming; handles high-throughput big data, clickstreams, and IoT feeds with sub-second latency.',
          'Amazon MQ: Managed ActiveMQ/RabbitMQ for legacy application migration using open-source protocols (MQTT, AMQP).',
          'Decoupling Rule: SQS decouples systems by queueing; SNS decouples by publishing events to independent subscribers; combining both yields the resilient Fan-out architecture.'
        ],
        keyPointsVi: [
          'Amazon SQS: Hàng đợi 1-1, cơ chế Kéo (Pull), lưu giữ tin 4-14 ngày; dùng để tách rời máy chủ xử lý tác vụ nền và đệm tải khi traffic tăng.',
          'Amazon SNS: Mô hình Pub/Sub 1-nhiều, cơ chế Đẩy (Push), không lưu giữ tin; dùng để phát thông báo sự kiện tức thời và nhân bản tin qua Fan-out.',
          'Amazon Kinesis: Nền tảng truyền luồng thời gian thực; xử lý dữ liệu lớn thông lượng cao, log click chuột và thiết bị IoT với độ trễ dưới 1 giây.',
          'Amazon MQ: Message broker quản lý cho ActiveMQ/RabbitMQ; dùng khi di chuyển ứng dụng tại chỗ lên đám mây giữ nguyên giao thức mở (MQTT, AMQP).',
          'Nguyên tắc tách rời hệ thống: SQS tách rời bằng cách xếp hàng đợi; SNS tách rời bằng cách phát sự kiện cho các bên độc lập; kết hợp cả hai tạo thành kiến trúc Fan-out bền bỉ kinh điển.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-14',
    sectionNumber: 14,
    titleEn: 'Cloud Monitoring (CloudWatch, CloudTrail, X-Ray, EventBridge & Health)',
    titleVi: 'Giám sát Đám mây & Vận hành (CloudWatch, CloudTrail, X-Ray, EventBridge & Health)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Monitoring Core',
    overviewEn: 'Section 14 delivers end-to-end mastery of monitoring, observability, audit logging, and automated event orchestration on AWS. Master Amazon CloudWatch (Metrics, Dashboards, Alarms, Logs & Insights, Unified Agent for RAM/Disk), Amazon EventBridge (serverless event bus & scheduled cron rules), AWS CloudTrail (governance, auditing API calls: who did what, when), AWS X-Ray (distributed tracing & service maps for microservices), and AWS Health Dashboard (global Service History vs personalized Your Account health).',
    overviewVi: 'Section 14 trang bị trọn vẹn kiến thức về giám sát hiệu năng, khả năng quan sát (Observability), kiểm toán bảo mật và tự động hóa điều phối sự kiện trên AWS. Làm chủ 5 dịch vụ vận hành cốt lõi: Amazon CloudWatch (Metrics đo hiệu năng, Dashboards trực quan, Alarms tự động kích hoạt Auto Scaling/SNS, CloudWatch Logs tập trung và Unified Agent đo RAM/Disk), Amazon EventBridge (lên lịch serverless cron và bus phản ứng sự kiện), AWS CloudTrail (kiểm toán API: ai làm gì, khi nào, từ đâu), AWS X-Ray (truy vết phân tán distributed tracing và sơ đồ Service Map cho microservice), và AWS Health Dashboard (tình trạng chung toàn cầu Service History vs cảnh báo cá nhân hóa Your Account).',
    quickExamFacts: [
      {
        en: 'CloudWatch Metrics: Monitors performance variables (CPU, Network, Disk). Basic Monitoring is 5 minutes (free); Detailed Monitoring is 1 minute (paid). RAM / Memory is NOT a default EC2 metric — requires installing Unified CloudWatch Agent! Billing metric is ONLY available in us-east-1.',
        vi: 'CloudWatch Metrics: Đo lường biến số hiệu năng (CPU, Network, Disk). Basic Monitoring là 5 phút (miễn phí); Detailed Monitoring là 1 phút (tính phí). RAM / Bộ nhớ KHÔNG phải metric mặc định của EC2 — bắt buộc phải cài Unified CloudWatch Agent! Metric chi phí (Billing) CHỈ có tại us-east-1.',
        isCoreHighlight: true
      },
      {
        en: 'CloudWatch Alarms: Evaluates metrics over time with 3 states: OK, ALARM, INSUFFICIENT_DATA. Triggers 3 primary actions: EC2 Auto Scaling (scale out/in), EC2 Instance Actions (Reboot, Stop, Terminate, Recover), and Amazon SNS notifications (email/SMS/webhooks).',
        vi: 'CloudWatch Alarms: Đánh giá metric theo thời gian với 3 trạng thái: OK, ALARM, INSUFFICIENT_DATA. Kích hoạt 3 hành động chính: EC2 Auto Scaling (tăng/giảm máy chủ), Hành động EC2 (Reboot, Stop, Terminate, Tự phục hồi Recover), và thông báo qua Amazon SNS (email/SMS/webhook).',
        isCoreHighlight: true
      },
      {
        en: 'CloudWatch Logs: Central log repository for Lambda, ECS, Beanstalk, EC2 (via agent), and on-prem. Log Groups define retention (1 day to never expire). Metric Filters extract metrics from logs (e.g. counting 404 errors) to trigger alarms. Logs Insights queries logs with interactive SQL-like syntax.',
        vi: 'CloudWatch Logs: Nơi gom log tập trung cho Lambda, ECS, Beanstalk, EC2 (qua agent), và máy chủ tại chỗ. Log Group quản lý thời gian lưu (1 ngày đến vĩnh viễn). Metric Filter lọc log (ví dụ đếm lỗi 404/ERROR) để tạo metric kích hoạt alarm. Logs Insights truy vấn log tương tác mạnh mẽ.',
        isCoreHighlight: true
      },
      {
        en: 'Amazon EventBridge (formerly CloudWatch Events): Serverless event bus that reacts to real-time system changes or runs scheduled cron jobs (e.g., hourly Lambda). 3 Event Buses: Default (AWS services), Partner (Datadog, Zendesk, Auth0), and Custom (own apps).',
        vi: 'Amazon EventBridge (tên cũ CloudWatch Events): Nền tảng bus sự kiện serverless phản ứng với thay đổi hệ thống thời gian thực hoặc lên lịch chạy cron job (ví dụ gọi Lambda mỗi giờ). 3 loại Event Bus: Default (dịch vụ AWS), Partner (đối tác Datadog, Zendesk), và Custom (ứng dụng tự viết).',
        isCoreHighlight: true
      },
      {
        en: 'AWS CloudTrail: Governance, compliance, and auditing of API calls. Answers "WHO did WHAT, WHEN, and from WHERE?". Enabled by default for all accounts with 90 days of Event History (free). Create a Trail to store logs indefinitely in S3 and stream to CloudWatch Logs.',
        vi: 'AWS CloudTrail: Quản trị, tuân thủ pháp lý và kiểm toán lệnh gọi API. Trả lời câu hỏi: "AI đã làm GÌ, KHI NÀO, và TỪ ĐÂU?". Bật mặc định 90 ngày lịch sử sự kiện Event History (miễn phí). Tạo Trail để lưu không giới hạn trong S3 và đẩy sang CloudWatch Logs.',
        isCoreHighlight: true
      },
      {
        en: 'AWS X-Ray: Distributed tracing for microservices and serverless architectures. Tracks requests end-to-end with Trace IDs, generates visual Service Maps, highlights latency bottlenecks, and provides root cause analysis of errors (4xx/5xx).',
        vi: 'AWS X-Ray: Truy vết phân tán (Distributed Tracing) cho ứng dụng microservice và serverless. Theo dõi request xuyên suốt qua các dịch vụ với Trace ID, vẽ bản đồ Service Map trực quan, phát hiện điểm nghẽn độ trễ và phân tích nguyên nhân gốc rễ gây lỗi (4xx/5xx).',
        isCoreHighlight: true
      },
      {
        en: 'AWS Health Dashboard: Service History shows global public status of all AWS services across all regions (no login required, 12 months history). Your Account (Personal Health Dashboard) shows alerts directly impacting YOUR resources (e.g. EC2 hardware degradation, maintenance windows).',
        vi: 'AWS Health Dashboard: Service History hiển thị tình trạng chung công khai của mọi dịch vụ AWS trên toàn cầu (không cần đăng nhập, lịch sử 12 tháng). Your Account (Personal Health Dashboard) hiển thị cảnh báo ảnh hưởng trực tiếp tới tài nguyên của BẠN (ví dụ máy chủ EC2 hỏng phần cứng, lịch bảo trì).',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-154',
        number: 154,
        titleEn: 'Amazon CloudWatch Metrics & Alarms Overview',
        titleVi: 'Tổng quan Amazon CloudWatch Metrics & Alarms (Chỉ số Hiệu năng & Cảnh báo)',
        summaryEn: 'Deep dive into CloudWatch Metrics (performance variables, namespaces, dimensions, EC2 Basic 5-min vs Detailed 1-min monitoring, custom metrics & RAM myth) and CloudWatch Alarms (OK / ALARM / INSUFFICIENT_DATA states with Auto Scaling, EC2 action, and SNS targets).',
        summaryVi: 'Đi sâu vào CloudWatch Metrics (biến số đo hiệu năng, namespace, dimensions, so sánh Basic 5 phút vs Detailed 1 phút trên EC2, custom metrics và câu hỏi bẫy RAM kinh điển) cùng CloudWatch Alarms (3 trạng thái OK / ALARM / INSUFFICIENT_DATA và 3 loại hành động: Auto Scaling, EC2 actions, SNS notification).',
        table: {
          headers: ['Loại hình giám sát CloudWatch', 'Độ phân giải thời gian (Resolution)', 'Chi phí & Thiết lập', 'Chỉ số đo lường tiêu biểu & Chú ý đề thi'],
          rows: [
            ['Basic Monitoring (Mặc định)', '5 phút một lần (5-minute intervals)', 'Hoàn toàn miễn phí, tự động bật sẵn cho mọi EC2 instance', 'CPUUtilization, NetworkIn/Out, DiskReadOps. KHÔNG theo dõi RAM hoặc dung lượng ổ đĩa OS'],
            ['Detailed Monitoring', '1 phút một lần (1-minute intervals)', 'Có tính phí bổ sung, phải bật thủ công trong cấu hình EC2', 'Phát hiện biến động tải nhanh gấp 5 lần, phản ứng kịp thời cho Auto Scaling co giãn nhạy bén'],
            ['Custom Metrics (Chỉ số tùy chỉnh)', 'Chuẩn: 1 phút / Cao (High-Resolution): 1 giây, 5s, 10s, 30s', 'Tính phí theo số lượng Custom Metric gửi về qua PutMetricData', 'RAM Utilization, Disk Space Available, số lượng người dùng đang online, độ trễ API tự viết'],
            ['Billing Metric (Dự toán chi phí)', 'Cập nhật nhiều lần trong ngày (mỗi 4-6 giờ)', 'Miễn phí, bật trong Billing Preferences', 'BẮT BUỘC lưu trữ tại us-east-1 (N. Virginia), theo dõi EstimatedCharges tổng của toàn tài khoản']
          ]
        },
        keyPointsEn: [
          'CloudWatch provides metrics for EVERY AWS service: Metrics are numerical variables over time (CPU, network, requests, latency).',
          'Metrics belong to Namespaces (e.g., AWS/EC2, AWS/S3, AWS/Lambda) and have Dimensions (attributes like InstanceId, Region, Environment; up to 30 dimensions per metric).',
          'EC2 Monitoring Granularity: Basic Monitoring sends data every 5 minutes (default & free); Detailed Monitoring sends data every 1 minute (additional cost).',
          'THE BIG EXAM TRICK: EC2 default metrics do NOT track RAM / Memory utilization or Disk free space because the hypervisor cannot inspect guest OS internal memory. To track RAM, you MUST install the Unified CloudWatch Agent!',
          'CloudWatch Alarms have 3 distinct states: OK (normal), ALARM (threshold breached), and INSUFFICIENT_DATA (not enough data points to evaluate).',
          'Alarm Actions: 1) EC2 Auto Scaling (scale-out / scale-in), 2) EC2 Instance Actions (Reboot, Stop, Terminate, or Recover on system status failure), 3) SNS Notifications (email, SMS, Lambda).',
          'Billing Metric (AWS/Billing) is strictly regional: available ONLY in us-east-1 (N. Virginia).'
        ],
        keyPointsVi: [
          'CloudWatch cung cấp metrics cho MỌI dịch vụ AWS: Metric là chuỗi giá trị số theo trục thời gian (CPU, lưu lượng mạng, số request, độ trễ).',
          'Mỗi metric thuộc về một Namespace (ví dụ: AWS/EC2, AWS/S3, AWS/Lambda) và có các Dimension (thuộc tính lọc như InstanceId, Region; tối đa 30 dimensions).',
          'Độ phân giải EC2: Basic Monitoring gửi dữ liệu mỗi 5 phút (mặc định, miễn phí); Detailed Monitoring gửi mỗi 1 phút (tính phí, giúp Auto Scaling phản ứng cực nhanh).',
          'BẪY THI KINH ĐIỂN: EC2 mặc định KHÔNG đo lường RAM (Bộ nhớ trong) hay dung lượng ổ đĩa còn trống do tầng giám sát ảo hóa (Hypervisor) không thể đọc bộ nhớ hệ điều hành khách. Muốn đo RAM, BẮT BUỘC phải cài Unified CloudWatch Agent!',
          'CloudWatch Alarms có 3 trạng thái rõ rệt: OK (bình thường), ALARM (vượt ngưỡng cảnh báo), và INSUFFICIENT_DATA (chưa đủ dữ liệu để tính toán).',
          '3 loại Hành động của Alarm: 1) Kích hoạt Auto Scaling (tăng/giảm EC2), 2) Hành động EC2 (Reboot, Stop, Terminate, hoặc Tự phục hồi Recover khi lỗi phần cứng), 3) Gửi thông báo qua SNS (Email, SMS, Lambda).',
          'Metric chi phí (AWS/Billing) là ngoại lệ đặc biệt: CHỈ khả dụng duy nhất tại Region us-east-1 (N. Virginia).'
        ],
        isCore: true
      },
      {
        id: 'lec-155',
        number: 155,
        titleEn: 'CloudWatch Metrics & Alarms Hands-On',
        titleVi: 'Thực hành CloudWatch Metrics, Custom Dashboards & Cấu hình Alarms với SNS',
        summaryEn: 'Step-by-step console practice: Navigating CloudWatch Metrics, creating cross-region Dashboards, setting up CPU utilization Alarms with Static & Anomaly detection thresholds, integrating SNS email alerts, and configuring EC2 Auto-Recovery.',
        summaryVi: 'Hướng dẫn thực hành từng bước trên AWS Console: Khám phá CloudWatch Metrics theo Namespace, tạo Dashboard trực quan hóa đa vùng (Cross-Region), thiết lập Alarm cảnh báo ngưỡng CPU (Static Threshold & Anomaly Detection), đấu nối SNS gửi email tự động và cấu hình EC2 Auto-Recovery.',
        table: {
          headers: ['Bước thực hành trên Console', 'Thao tác kỹ thuật cụ thể', 'Mục đích & Lưu ý quan trọng'],
          rows: [
            ['1. Khám phá Metrics', 'CloudWatch Console -> Metrics -> All metrics -> AWS/EC2 -> Per-Instance Metrics', 'Tìm metric CPUUtilization của instance đang chạy, chuyển đổi đồ thị Line / Stacked area / Number'],
            ['2. Tạo CloudWatch Dashboard', 'Dashboards -> Create dashboard -> Thêm Widget (Line Chart, Single Value, Gauge)', 'Dashboard có tính chất Toàn cầu (Global) - có thể tổng hợp widget từ nhiều Region và nhiều tài khoản AWS khác nhau'],
            ['3. Tạo CloudWatch Alarm', 'Alarms -> Create alarm -> Chọn metric CPUUtilization -> Đặt ngưỡng > 70% trong 5 phút', 'Có thể chọn Static Threshold (ngưỡng cố định) hoặc Anomaly Detection (dải băng động phát hiện bất thường bằng máy học)'],
            ['4. Cấu hình SNS Action', 'Chọn "In alarm" -> Send notification to SNS topic -> Tạo topic mới -> Nhập email người nhận', 'AWS gửi email xác nhận "AWS Notification - Subscription Confirmation"; người nhận BẮT BUỘC phải click link để kích hoạt nhận mail'],
            ['5. Cấu hình EC2 Action', 'Thêm hành động EC2: "Recover this instance" khi gặp lỗi StatusCheckFailed_System', 'Tự động di chuyển máy chủ sang máy chủ vật lý mới nếu phần cứng của AWS bên dưới gặp sự cố mà vẫn giữ nguyên IP/EBS']
          ]
        },
        keyPointsEn: [
          'CloudWatch Dashboards are global and can aggregate metrics and alarms from multiple AWS regions on a single screen.',
          'Static Threshold vs Anomaly Detection: Static triggers at fixed values (e.g. CPU > 80%); Anomaly Detection uses machine learning to dynamically establish expected metric bands.',
          'SNS Email Subscription Requirement: When creating an alarm with SNS email notification, the subscriber MUST click the confirmation link sent by AWS before emails are delivered.',
          'EC2 Auto-Recovery Action: Automatically migrates the virtual instance to new underlying host hardware if a System Status Check fails, preserving instance ID, private IP, elastic IP, and EBS volumes.',
          'Composite Alarms: Combine multiple alarms using boolean logic (AND, OR, NOT) to prevent alarm noise and storm fatigue during cascading system events.'
        ],
        keyPointsVi: [
          'CloudWatch Dashboards mang tính toàn cầu: Có thể gom đồ thị từ nhiều AWS Region khác nhau lên cùng một màn hình quản trị duy nhất.',
          'Ngưỡng cố định (Static) vs Phát hiện bất thường (Anomaly Detection): Static kích hoạt khi vượt mốc cứng (CPU > 80%); Anomaly Detection dùng AI tự học biểu đồ tuần hoàn để vẽ dải biên an toàn.',
          'Yêu cầu xác thực SNS Email: Khi tạo cảnh báo gửi mail qua SNS, người nhận BẮT BUỘC phải bấm đường link "Confirm subscription" trong hòm thư thì cảnh báo mới được gửi tới.',
          'Cơ chế EC2 Auto-Recovery: Tự động cứu vớt máy chủ ảo sang một phần cứng vật lý mới nếu gặp lỗi System Status Check, giữ nguyên toàn bộ Instance ID, Private IP, Elastic IP và ổ cứng EBS.',
          'Composite Alarms (Cảnh báo kết hợp): Ghép nhiều cảnh báo lại với nhau bằng toán tử logic (AND, OR, NOT) để triệt tiêu tình trạng báo động giả hoặc bão email khi xảy ra sự cố dây chuyền.'
        ],
        isCore: true
      },
      {
        id: 'lec-156',
        number: 156,
        titleEn: 'Amazon CloudWatch Logs Overview',
        titleVi: 'Tổng quan Amazon CloudWatch Logs (Thu thập, Lưu trữ & Phân tích Log Tập trung)',
        summaryEn: 'Comprehensive overview of CloudWatch Logs architecture: Log Groups, Log Streams, retention policies, native integration with Lambda/ECS/Beanstalk, Metric Filters (generating metrics from logs), and real-time subscription exports.',
        summaryVi: 'Tổng quan kiến trúc toàn diện của CloudWatch Logs: Cấu trúc phân cấp Log Groups và Log Streams, chính sách lưu trữ linh hoạt (Retention Policies), tích hợp tự động với Lambda/ECS/Beanstalk, cơ chế trích xuất Metric Filters từ log và xuất luồng theo thời gian thực (Subscription Filters).',
        table: {
          headers: ['Khái niệm / Thành phần', 'Bản chất kỹ thuật & Quy ước đặt tên', 'Vai trò vận hành & Khả năng tích hợp'],
          rows: [
            ['Log Group', 'Tập hợp các log stream có chung cấu hình retention, phân quyền IAM và tag (Ví dụ: /aws/lambda/process-order)', 'Quản lý chính sách vòng đời dữ liệu (từ 1 ngày, 30 ngày, 1 năm đến Vĩnh viễn không bao giờ hết hạn)'],
            ['Log Stream', 'Chuỗi sự kiện log từ một nguồn cụ thể (Ví dụ: 1 EC2 instance cụ thể, 1 container Docker, 1 file log apache)', 'Chứa các log event có dấu thời gian (timestamp UTC) và thông điệp nội dung (message string)'],
            ['Metric Filter', 'Bộ lọc tìm kiếm mẫu văn bản bên trong log (Ví dụ: tìm chuỗi "[ERROR]" hoặc mã HTTP status "404")', 'Biến tần suất xuất hiện lỗi trong log thành một Custom CloudWatch Metric để kích hoạt Alarm gửi cảnh báo ngay'],
            ['Logs Subscription Filter', 'Bộ định tuyến chuyển tiếp luồng log thời gian thực', 'Đẩy log sang AWS Lambda, Kinesis Data Streams, Amazon Data Firehose để nạp vào OpenSearch / Splunk'],
            ['Unified CloudWatch Agent', 'Phần mềm agent cài trực tiếp vào hệ điều hành (EC2 hoặc On-premises server)', 'Gom cả Log files hệ thống (/var/log/messages) và đo lường chuyên sâu chỉ số RAM, Swap, Disk Space']
          ]
        },
        keyPointsEn: [
          'Centralized logging: Aggregates logs from AWS Lambda (automatic), Elastic Beanstalk (automatic), ECS, API Gateway, CloudTrail, Route 53, and EC2 instances.',
          'EC2 instances do NOT push logs by default: You must install the Unified CloudWatch Agent and attach an IAM role with CloudWatchAgentServerPolicy permissions.',
          'Log retention policies: Can be set anywhere from 1 day up to 10 years, or set to "Never Expire" (default). Setting appropriate retention saves storage costs.',
          'Metric Filters allow you to count specific log occurrences (e.g. search for "ERROR" or HTTP "403" / "500") and create a CloudWatch Metric from it.',
          'Subscription Filters stream log events in near-real-time to destinations such as Lambda, Amazon Kinesis, Amazon OpenSearch, or Splunk for advanced analytics.',
          'Logs can be exported in batch to Amazon S3 for long-term cold compliance storage (note: S3 export can take up to 12 hours).'
        ],
        keyPointsVi: [
          'Gom log tập trung: Tự động nhận log từ AWS Lambda (mặc định), Elastic Beanstalk (mặc định), ECS container, API Gateway, CloudTrail, Route 53 và EC2.',
          'EC2 mặc định KHÔNG tự đẩy log: Bắt buộc phải cài phần mềm Unified CloudWatch Agent vào máy và gán IAM Role có quyền CloudWatchAgentServerPolicy.',
          'Chính sách lưu giữ log (Retention Policy): Cấu hình linh hoạt từ 1 ngày tới 10 năm, hoặc "Never Expire" (mặc định). Cần đặt hạn lưu để tối ưu chi phí lưu trữ S3/Logs.',
          'Metric Filters cho phép lọc từ khóa trong file log (ví dụ: tìm chữ "ERROR" hoặc mã lỗi HTTP "403" / "500") và biến thành một CloudWatch Metric để gắn Alarm báo động.',
          'Subscription Filters đẩy luồng log thời gian thực sang Lambda, Kinesis Data Streams, hoặc nạp thẳng vào Elasticsearch / OpenSearch / Splunk để phân tích chuyên sâu.',
          'Có thể xuất hàng loạt log sang Amazon S3 để lưu trữ phục vụ kiểm toán dài hạn (Lưu ý: lệnh Export sang S3 là tác vụ bất đồng bộ, có thể mất tới vài giờ).'
        ],
        isCore: true
      },
      {
        id: 'lec-157',
        number: 157,
        titleEn: 'CloudWatch Logs & Logs Insights Hands-On',
        titleVi: 'Thực hành CloudWatch Logs, Truy vấn Logs Insights & Metric Filters',
        summaryEn: 'Hands-on console exploration of Log Groups, inspecting real-time Log Streams, writing interactive queries using CloudWatch Logs Insights syntax, and creating Metric Filters to alarm on 404/500 errors.',
        summaryVi: 'Hướng dẫn thực hành trên Console: Kiểm tra Log Groups sinh ra từ Lambda, soi chi tiết Log Streams theo thời gian thực, viết câu lệnh truy vấn tìm lỗi với CloudWatch Logs Insights và tạo Metric Filter để bắt lỗi 404/500 kích hoạt Alarm.',
        table: {
          headers: ['Cú pháp lệnh Logs Insights', 'Ý nghĩa câu lệnh', 'Ví dụ thực chiến trên Console'],
          rows: [
            ['fields @timestamp, @message', 'Lựa chọn các trường dữ liệu cần hiển thị', 'fields @timestamp, @message, @logStream'],
            ['filter @message like /ERROR/', 'Lọc bản ghi log chứa biểu thức chính quy (Regex)', 'filter @message like /(?i)exception/ or @message like /error/'],
            ['stats count(*) by bin(5m)', 'Tổng hợp dữ liệu theo khoảng thời gian đệm 5 phút', 'stats count(*) by bin(1h) để vẽ đồ thị mật độ lỗi theo từng giờ'],
            ['sort @timestamp desc', 'Sắp xếp thời gian giảm dần (log mới nhất hiện lên trước)', 'sort @timestamp desc | limit 25']
          ]
        },
        keyPointsEn: [
          'CloudWatch Logs Insights is an interactive log query engine that searches petabytes of log data in seconds without spinning up clusters.',
          'Logs Insights uses a purpose-built query syntax (fields, filter, stats, sort, limit) and provides visual visualizations (bar charts, line charts).',
          'Creating Metric Filter: Define filter pattern like `[ip, user, username, timestamp, request, status_code = 404, size]`, assign Metric Name `404ErrorCount`, and assign Metric Value `1`.',
          'Once a Metric Filter is created, it functions identically to any standard CloudWatch Metric — you can graph it on Dashboards and trigger Alarms from it.',
          'Unified CloudWatch Agent installation: Requires the IAM policy `CloudWatchAgentServerPolicy` attached to the EC2 Instance Profile; can be deployed via AWS Systems Manager (SSM) Run Command.'
        ],
        keyPointsVi: [
          'CloudWatch Logs Insights là công cụ truy vấn log tương tác cực nhanh: Quét hàng Terabyte log chỉ trong vài giây mà không cần cài đặt cụm máy chủ Elasticsearch.',
          'Logs Insights sử dụng cú pháp chuyên biệt (fields, filter, stats, sort, limit) và hỗ trợ vẽ đồ thị phân tích trực tiếp trên giao diện console.',
          'Tạo Metric Filter: Định nghĩa pattern lọc mẫu `[ip, user, username, timestamp, request, status_code = 404, size]`, đặt tên metric `404ErrorCount` và tăng giá trị `1` mỗi khi bắt được.',
          'Sau khi tạo Metric Filter, metric này hoạt động y hệt metric hệ thống của AWS — có thể đưa lên Dashboard và gắn CloudWatch Alarm để báo động.',
          'Cài đặt Unified CloudWatch Agent: Cần gắn IAM Role có quyền `CloudWatchAgentServerPolicy` vào EC2; có thể triển khai tự động hàng loạt qua AWS Systems Manager (SSM) Run Command.'
        ],
        isCore: true
      },
      {
        id: 'lec-158',
        number: 158,
        titleEn: 'Amazon EventBridge Overview (formerly CloudWatch Events)',
        titleVi: 'Tổng quan Amazon EventBridge (Kiến trúc Hướng sự kiện & Lên lịch Serverless Cron)',
        summaryEn: 'Complete breakdown of Amazon EventBridge: Event-driven architecture, reactive event routing, scheduled rules (cron/rate expressions), 3 Event Buses (Default, Partner, Custom), schema registry, and rich target integrations.',
        summaryVi: 'Tổng quan chi tiết về Amazon EventBridge (tên cũ CloudWatch Events): Nền tảng điều phối theo sự kiện (Event-Driven), định tuyến phản ứng sự kiện thời gian thực, cơ chế lên lịch cron serverless, phân biệt 3 loại Event Bus (Default, Partner, Custom) và khả năng chuyển tiếp tới hơn 20 đích đến (Targets).',
        table: {
          headers: ['Loại Event Bus trong EventBridge', 'Nguồn phát sự kiện (Event Source)', 'Trường hợp sử dụng thực tế'],
          rows: [
            ['Default Event Bus', 'Tất cả các dịch vụ nội bộ của AWS (EC2, S3, CodePipeline, IAM, GuardDuty, Health)', 'Phản ứng khi EC2 đổi trạng thái, S3 có file mới, có lệnh đăng nhập tài khoản Root hoặc cảnh báo bảo mật'],
            ['Partner Event Bus', 'Các ứng dụng SaaS đối tác bên ngoài (Datadog, Zendesk, Auth0, Shopify, PagerDuty, MongoDB)', 'Nhận sự kiện từ bên thứ ba (khách tạo ticket Zendesk, user đổi mật khẩu Auth0) kích hoạt Lambda trên AWS'],
            ['Custom Event Bus', 'Ứng dụng tự phát triển của chính doanh nghiệp gửi qua API PutEvents', 'Điều phối sự kiện nghiệp vụ microservices (ví dụ: order_created, payment_succeeded) giữa các hệ thống']
          ]
        },
        keyPointsEn: [
          'Amazon EventBridge is the evolution of CloudWatch Events (uses the same underlying API and service concepts with expanded partner & schema capabilities).',
          'Two main operating modes: 1) Scheduled Rules (run like a serverless cron job every hour, day, or rate expression), 2) Event Pattern Rules (react immediately to JSON events from AWS or SaaS partners).',
          'The 3 Event Buses: Default Bus (all AWS services), Partner Event Bus (SaaS integrations like Datadog, Zendesk, Auth0), and Custom Bus (your own applications via PutEvents API).',
          'Targets: When a rule matches an event pattern, it routes the JSON payload to targets including AWS Lambda, Amazon SNS, Amazon SQS, Step Functions, Kinesis, ECS Tasks, or API Destinations (external HTTP endpoints).',
          'EventBridge Schema Registry: Automatically discovers event structure and generates typed client code bindings (Java, Python, TypeScript) for developers.',
          'Event Archive & Replay: Ability to record all events passing through an event bus and replay past events for debugging, testing, or audit recovery.'
        ],
        keyPointsVi: [
          'Amazon EventBridge là phiên bản nâng cấp của CloudWatch Events (cùng chung API nền tảng nhưng mở rộng thêm kết nối SaaS và Schema Registry).',
          '2 chế độ hoạt động chủ đạo: 1) Scheduled Rules (lên lịch serverless cron chạy theo giờ, ngày, hoặc chu kỳ rate), 2) Event Pattern Rules (phản ứng tức thời theo thời gian thực khi có sự kiện JSON xảy ra).',
          '3 loại Event Bus: Default Bus (nhận từ mọi dịch vụ AWS), Partner Event Bus (nhận từ đối tác SaaS như Datadog, Zendesk, Auth0, Shopify), và Custom Bus (nhận từ ứng dụng nội bộ qua API PutEvents).',
          'Các đích đến (Targets): Khi Rule khớp sự kiện, nó đẩy dữ liệu sang Lambda, SNS, SQS, Step Functions, Kinesis, ECS Task, hoặc API Destinations (gọi trực tiếp ra API HTTP bên ngoài).',
          'Schema Registry: Tự động phân tích cấu trúc dữ liệu JSON của sự kiện và sinh mã nguồn định kiểu (code binding) cho Java, Python, TypeScript.',
          'Tính năng Archive & Replay: Lưu trữ lại toàn bộ sự kiện đã đi qua Bus và cho phép "phát lại" (replay) các sự kiện quá khứ để debug hoặc khắc phục sự cố.'
        ],
        isCore: true
      },
      {
        id: 'lec-159',
        number: 159,
        titleEn: 'Amazon EventBridge Hands-On',
        titleVi: 'Thực hành Amazon EventBridge (Tạo Rule Lên lịch Cron & Rule Phản ứng Sự kiện EC2)',
        summaryEn: 'Practical hands-on steps: Building a scheduled rule using Cron expressions to trigger Lambda, and configuring an Event Pattern rule to detect EC2 state changes (stopping/terminating) with instant SNS email alerts.',
        summaryVi: 'Thực hành trực tiếp trên AWS Console: Tạo Rule lên lịch định kỳ bằng biểu thức Cron/Rate để kích hoạt hàm Lambda, và tạo Event Pattern Rule bắt sự kiện thay đổi trạng thái máy chủ EC2 (stopping/shutting-down) để bắn email cảnh báo tức thì qua SNS.',
        table: {
          headers: ['Bài toán thực hành', 'Cấu hình Event Pattern / Schedule', 'Đích đến (Target) & Kết quả kiểm chứng'],
          rows: [
            ['Lên lịch tắt máy chủ ban đêm (Tiết kiệm chi phí)', 'Schedule expression: cron(0 20 ? * MON-FRI *) (chạy lúc 20:00 thứ 2 đến thứ 6)', 'Target: AWS Lambda Function gọi lệnh ec2.stop_instances() -> Không cần duy trì máy chủ cron chạy 24/7'],
            ['Cảnh báo khi máy chủ EC2 bị tắt hoặc xóa', 'Event Source: AWS services -> EC2 -> EC2 Instance State-change Notification (state: stopped, terminated)', 'Target: Amazon SNS Topic -> SysAdmin nhận được email thông báo trong vòng dưới 2 giây kể từ khi instance đổi trạng thái'],
            ['Giám sát người dùng Root đăng nhập', 'Event Source: AWS services -> Sign-in Events -> Console Sign-in via CloudTrail (detail: root user)', 'Target: SNS Topic khẩn cấp / Lambda gửi cảnh báo vào kênh Slack của đội ngũ Security Operations']
          ]
        },
        keyPointsEn: [
          'Cron Expressions in EventBridge have 6 required fields: Minutes, Hours, Day-of-month, Month, Day-of-week, Year (e.g. `cron(0 18 ? * MON-FRI *)`).',
          'Rate Expressions provide a simpler interval format: `rate(5 minutes)`, `rate(1 hour)`, `rate(1 day)`.',
          'Event Pattern JSON matching: Filters events based on exact fields, prefix matching, numeric ranges, or existence checks within the incoming JSON envelope.',
          'EventBridge Rules can send the full matched JSON payload, a constant JSON string, or use the Input Transformer to format a human-readable email message before invoking targets.',
          'Multiple targets per rule: A single EventBridge rule can trigger up to 5 targets simultaneously (e.g., invoke a Lambda function AND publish an SNS message AND write to a CloudWatch Log Group).'
        ],
        keyPointsVi: [
          'Biểu thức Cron trong EventBridge gồm 6 trường: Phút, Giờ, Ngày trong tháng, Tháng, Thứ trong tuần, Năm (Ví dụ: `cron(0 18 ? * MON-FRI *)`).',
          'Biểu thức Rate đơn giản hơn: Viết dưới dạng `rate(5 minutes)`, `rate(1 hour)`, `rate(1 day)`.',
          'Cơ chế khớp Event Pattern JSON: Lọc sự kiện dựa trên giá trị chính xác, tiền tố (prefix), khoảng số học, hoặc kiểm tra sự tồn tại của trường trong gói JSON gửi đến.',
          'Input Transformer: Cho phép bóc tách các trường từ JSON thô (như instance-id, state) và ghép thành một đoạn tin nhắn thân thiện, dễ đọc trước khi gửi email tới người dùng.',
          'Đa mục tiêu (Multiple Targets): Một Rule duy nhất có thể kích hoạt đồng thời tối đa 5 đích đến (ví dụ vừa gọi Lambda, vừa gửi SNS, vừa ghi vào CloudWatch Log Group).'
        ],
        isCore: true
      },
      {
        id: 'lec-160',
        number: 160,
        titleEn: 'AWS CloudTrail Overview',
        titleVi: 'Tổng quan AWS CloudTrail (Kiểm toán Quản trị, Lịch sử Gọi API & Tuân thủ Pháp lý)',
        summaryEn: 'Deep-dive into AWS CloudTrail: Governance, compliance, and auditing for your AWS account. Records all API calls (Console, CLI, SDK). Default 90-day Event History vs creating a Trail to Amazon S3, Management Events vs Data Events, and CloudTrail Insights.',
        summaryVi: 'Nghiên cứu chuyên sâu về AWS CloudTrail: Dịch vụ quản trị, tuân thủ pháp lý và kiểm toán hoạt động tài khoản AWS. Ghi lại mọi lệnh gọi API (Console, CLI, SDK). Phân biệt lịch sử sự kiện mặc định 90 ngày (Event History) với tạo Trail lưu S3 lâu dài, phân loại Management Events vs Data Events và trí tuệ nhân tạo CloudTrail Insights.',
        table: {
          headers: ['Phân loại sự kiện CloudTrail', 'Mức độ chi tiết & Thiết lập mặc định', 'Ví dụ thao tác & Chi phí'],
          rows: [
            ['Management Events (Sự kiện quản trị)', 'Ghi lại các thao tác cấu hình tài nguyên trên tài khoản. BẬT MẶC ĐỊNH (Miễn phí ghi bản đầu tiên)', 'Tạo EC2 instance, cấu hình VPC, đính kèm IAM Policy, xóa Subnet, sửa cấu hình Route 53'],
            ['Data Events (Sự kiện dữ liệu)', 'Ghi lại các thao tác ở cấp độ đối tượng dữ liệu. MẶC ĐỊNH TẮT (Vì khối lượng cực lớn, có tính phí)', 'S3 GetObject / PutObject / DeleteObject, Lambda Invoke API. Phục vụ truy vết truy cập dữ liệu nhạy cảm'],
            ['CloudTrail Insights', 'Sử dụng Machine Learning để phân tích các mẫu hành vi bất thường. MẶC ĐỊNH TẮT (Có tính phí)', 'Phát hiện sự đột biến bất thường: tăng vọt lỗi AccessDenied, nhiều lệnh xóa tài nguyên lúc nửa đêm'],
            ['Event History vs Trail', 'Event History: Lưu 90 ngày, miễn phí, xem trên Console. Trail: Xuất log liên tục ra S3 bucket', 'Muốn lưu log trên 90 ngày (1 năm, 7 năm) phục vụ thanh tra tài chính -> BẮT BUỘC tạo CloudTrail Trail']
          ]
        },
        keyPointsEn: [
          'The Golden Rule of CloudTrail: Answers "WHO did WHAT, WHEN, from WHERE, and USING WHAT tool?".',
          'Every API call is recorded: Actions performed via the AWS Management Console, AWS CLI, AWS SDKs, and automated AWS services are captured as JSON log events.',
          'Event History is enabled by default for all AWS accounts and stores management events for the last 90 days at NO additional cost.',
          'Creating a Trail: To retain event records beyond 90 days, you MUST create a Trail and deliver logs to an Amazon S3 bucket (with optional SSE-KMS encryption and Log File Validation).',
          'Multi-Region Trail: Records events across ALL AWS Regions in a single centralized S3 bucket (strongly recommended best practice).',
          'CloudTrail Insights: Machine learning anomaly detection that flags unusual operational spikes or malicious activities (e.g., sudden burst of IAM permission failures).',
          'Log File Integrity: Uses cryptographic SHA-256 hashing and digital signatures to ensure log files delivered to S3 have not been modified, deleted, or tampered with.'
        ],
        keyPointsVi: [
          'Nguyên tắc vàng của CloudTrail: Trả lời chính xác câu hỏi "AI đã làm GÌ, VÀO LÚC NÀO, TỪ ĐÂU (Địa chỉ IP), và DÙNG CÔNG CỤ GÌ?".',
          'Ghi lại MỌI lệnh gọi API: Bất kể thao tác được thực hiện từ AWS Management Console, AWS CLI, AWS SDK, hay dịch vụ tự động đều được lưu thành bản ghi JSON.',
          'Event History được BẬT MẶC ĐỊNH cho mọi tài khoản AWS: Lưu trữ sự kiện quản trị trong 90 ngày gần nhất hoàn toàn MIỄN PHÍ.',
          'Tạo CloudTrail Trail: Để lưu trữ log trên 90 ngày (phục vụ kiểm toán nội bộ hoặc luật an ninh mạng), BẮT BUỘC phải tạo Trail và xuất log vào một Amazon S3 bucket.',
          'Multi-Region Trail: Thu thập sự kiện từ TẤT CẢ các Region trên toàn cầu gom về một S3 bucket duy nhất (khuyến nghị bảo mật chuẩn của AWS).',
          'CloudTrail Insights: Sử dụng máy học để tự động phát hiện các hành vi bất thường (ví dụ: bùng nổ số lượng lỗi AccessDenied, tạo tài khoản IAM hàng loạt).',
          'Log File Integrity: Sử dụng băm mã hóa SHA-256 và chữ ký số để chứng minh file log trong S3 không bị chỉnh sửa, chèn hay xóa bất hợp pháp.'
        ],
        isCore: true
      },
      {
        id: 'lec-161',
        number: 161,
        titleEn: 'AWS CloudTrail Hands-On',
        titleVi: 'Thực hành AWS CloudTrail (Tra cứu Event History, Tạo Multi-Region Trail & Phân tích Log JSON)',
        summaryEn: 'Console walkthrough: Investigating who deleted an EC2 instance or S3 bucket using Event History filters, analyzing the JSON event payload structure, creating a permanent Trail to S3, and streaming logs to CloudWatch Logs for alarms.',
        summaryVi: 'Hướng dẫn thực hành trên Console: Điều tra truy vết ai đã xóa EC2 instance hoặc S3 bucket qua bộ lọc Event History, giải mã cấu trúc JSON của một bản ghi CloudTrail, tạo Multi-Region Trail ghi vào S3 và đẩy log sang CloudWatch Logs để cảnh báo lỗi bảo mật.',
        table: {
          headers: ['Trường thông tin JSON trong CloudTrail', 'Ý nghĩa dữ liệu thực tế', 'Ví dụ giá trị trích xuất'],
          rows: [
            ['eventTime', 'Thời điểm chính xác lệnh API được thực thi (theo chuẩn UTC)', '"2026-10-08T07:15:32Z"'],
            ['eventName', 'Tên hàm API được gọi trên dịch vụ AWS', '"TerminateInstances", "CreateUser", "DeleteBucket"'],
            ['userIdentity', 'Định danh đầy đủ của người hoặc quyền thực hiện cuộc gọi', 'IAM User ARN (alice@company), Root account, hoặc AssumedRole của EC2'],
            ['sourceIPAddress', 'Địa chỉ IP nguồn nơi phát ra yêu cầu API', '"203.113.152.12" (IP văn phòng) hoặc "console.amazonaws.com"'],
            ['userAgent', 'Trình duyệt hoặc phần mềm SDK/CLI được sử dụng', '"aws-cli/2.15.0", "Mozilla/5.0", "boto3/1.34"'],
            ['requestParameters', 'Tham số chi tiết truyền vào câu lệnh', 'InstanceId: "i-0987654321abcdef0"']
          ]
        },
        keyPointsEn: [
          'Scenario investigation: When an incident occurs ("Who terminated our production database?"), open CloudTrail Event History and filter by Event Name `DeleteDBInstance` or Resource Name.',
          'Inspecting JSON logs: The `userIdentity` block provides absolute proof of the caller identity, whether an IAM user, root user, or an IAM assumed role.',
          'Creating a Trail with S3: A dedicated bucket policy must be applied allowing `cloudtrail.amazonaws.com` permission to write `PutObject` into the target bucket.',
          'Integration with CloudWatch Logs: CloudTrail can stream events in real time to a CloudWatch Log Group, allowing you to create Metric Filters (e.g. on `AccessDenied`) and trigger instant alarms.',
          'Organizations Trail: When configured at the AWS Organizations management account, it automatically records all API events across all member accounts without individual setup.'
        ],
        keyPointsVi: [
          'Quy trình điều tra sự cố: Khi xảy ra sự cố ("Ai đã xóa Database Production?"), mở ngay CloudTrail Event History và lọc theo Event Name `DeleteDBInstance` hoặc tên tài nguyên.',
          'Giải mã JSON: Khối `userIdentity` cung cấp bằng chứng thép về danh tính người thực hiện, phân biệt rõ người dùng IAM, tài khoản Root hay quyền tạm thời AssumedRole.',
          'Tạo Trail lưu vào S3: S3 bucket cần được cấu hình Bucket Policy cho phép dịch vụ `cloudtrail.amazonaws.com` quyền ghi file `PutObject`.',
          'Đẩy log sang CloudWatch Logs: CloudTrail có thể truyền luồng sự kiện sang CloudWatch Logs để tạo Metric Filter bắt lỗi phân quyền `AccessDenied` và bắn cảnh báo ngay.',
          'Organizations Trail: Cấu hình từ tài khoản quản lý (Management Account) trong AWS Organizations sẽ tự động ghi log toàn bộ các tài khoản thành viên trong doanh nghiệp.'
        ],
        isCore: true
      },
      {
        id: 'lec-162',
        number: 162,
        titleEn: 'AWS X-Ray Overview',
        titleVi: 'Tổng quan AWS X-Ray (Truy vết Phân tán Distributed Tracing & Sơ đồ Service Map)',
        summaryEn: 'Detailed guide to AWS X-Ray for distributed architectures and microservices: Traces, Segments, Subsegments, visual Service Maps, identifying performance latency bottlenecks, error rate tracking, and root cause analysis.',
        summaryVi: 'Hướng dẫn chuyên sâu về AWS X-Ray dành cho kiến trúc phân tán và microservices: Khái niệm Trace, Segments, Subsegments, bản đồ quan hệ Service Map trực quan, phát hiện nút thắt cổ chai độ trễ (latency bottleneck), phân tích nguyên nhân gốc rễ (Root Cause Analysis).',
        table: {
          headers: ['Khái niệm cốt lõi của X-Ray', 'Định nghĩa kỹ thuật', 'Vai trò trong phát hiện sự cố'],
          rows: [
            ['Trace (Vết truy vết)', 'Đại diện cho toàn bộ hành trình từ đầu đến cuối của một request đi qua mọi dịch vụ', 'Mỗi request được gán một Trace ID duy nhất (X-Amzn-Trace-Id) được truyền qua HTTP Header'],
            ['Segment (Phân đoạn)', 'Dữ liệu đo lường do một tài nguyên máy chủ phát ra (Ví dụ: EC2, ECS, Lambda)', 'Chứa thông tin thời gian xử lý, tên máy chủ, trạng thái HTTP trả về, lỗi và ngoại lệ'],
            ['Subsegment (Phân đoạn con)', 'Chi tiết mức hạt mịn hơn bên trong một Segment', 'Đo đạc thời gian chạy một câu lệnh SQL vào RDS, cuộc gọi HTTP ra API bên ngoài, hoặc ghi dữ liệu vào DynamoDB'],
            ['Service Map (Bản đồ dịch vụ)', 'Sơ đồ mạng trực quan hiển thị tất cả các microservices và mối liên kết giữa chúng', 'Mã màu trực quan: Xanh (2xx bình thường), Vàng (4xx lỗi client), Đỏ (5xx lỗi server), Tím (Throttle nghẽn mạng)']
          ]
        },
        keyPointsEn: [
          'The microservices challenge: In a distributed system, a single user request may pass through API Gateway, 4 Lambda functions, SQS, ECS, and DynamoDB. If a request is slow or errors out, finding the culprit is extremely difficult.',
          'AWS X-Ray solves this with Distributed Tracing: Collecting telemetry data across every application component.',
          'Trace Header: The `X-Amzn-Trace-Id` HTTP header is automatically propagated across all downstream services to correlate the entire request lifecycle.',
          'Visual Service Map: Displays all connected services, latency distributions, and health color codes (Green = OK, Yellow = 4xx client errors, Red = 5xx server errors, Purple = Throttled requests).',
          'Root Cause Analysis: Enables developers to pinpoint the exact database query, external HTTP call, or code exception causing performance degradations.',
          'Integrations: Native one-click support in AWS Lambda, AWS API Gateway, AWS Elastic Beanstalk, Amazon ECS, and EC2 via the X-Ray daemon.'
        ],
        keyPointsVi: [
          'Thách thức của Microservices: Trong kiến trúc phân tán, một thao tác của người dùng có thể đi qua API Gateway, 4 hàm Lambda, SQS, ECS và DynamoDB. Nếu request bị chậm hoặc lỗi, rất khó tìm ra dịch vụ nào là thủ phạm.',
          'AWS X-Ray giải quyết triệt để bằng Distributed Tracing: Thu thập dữ liệu đo đạc xuyên suốt mọi thành phần của ứng dụng.',
          'Trace Header: Mã nhận diện `X-Amzn-Trace-Id` trong HTTP Header được tự động truyền tiếp qua các dịch vụ phía sau để liên kết toàn bộ vòng đời của một request.',
          'Bản đồ Service Map trực quan: Hiển thị sơ đồ mạng toàn bộ dịch vụ, phân bổ độ trễ và mã màu sức khỏe (Xanh = 2xx, Vàng = 4xx, Đỏ = 5xx, Tím = Bị nghẽn Throttle).',
          'Phân tích nguyên nhân gốc rễ (Root Cause Analysis): Giúp lập trình viên chỉ ra chính xác câu lệnh SQL nào chạy chậm, API bên ngoài nào bị timeout hoặc dòng code nào quăng Exception.',
          'Tích hợp đa dạng: Bật bằng 1 cú click chuột trên AWS Lambda, API Gateway, Elastic Beanstalk, ECS và máy chủ EC2 thông qua daemon X-Ray.'
        ],
        isCore: true
      },
      {
        id: 'lec-163',
        number: 163,
        titleEn: 'AWS Health Dashboard (Service History vs Your Account)',
        titleVi: 'Tổng quan AWS Health Dashboard (Service History Toàn cầu vs Your Account Cá nhân hóa)',
        summaryEn: 'Crucial exam distinction: AWS Health Dashboard unifies Service History (public global status of all AWS services across all regions, no login needed) and Your Account / Personal Health Dashboard (authenticated, alerts impacting YOUR specific resources, maintenance notices).',
        summaryVi: 'Điểm phân biệt trọng tâm trong đề thi: AWS Health Dashboard hợp nhất 2 góc nhìn: Service History (tình trạng chung toàn cầu của mọi dịch vụ AWS trên tất cả Region, không cần đăng nhập) và Your Account / Personal Health Dashboard (cần đăng nhập, cảnh báo ảnh hưởng trực tiếp tới tài nguyên của BẠN, lịch bảo trì phần cứng).',
        table: {
          headers: ['Tiêu chí phân biệt', 'Service History (Lịch sử dịch vụ toàn cầu)', 'Your Account (Personal Health Dashboard - Tài khoản của bạn)'],
          rows: [
            ['Yêu cầu đăng nhập', 'KHÔNG cần đăng nhập AWS Console (Trang công khai: health.aws.amazon.com)', 'BẮT BUỘC phải đăng nhập vào tài khoản AWS của bạn'],
            ['Phạm vi thông tin', 'Tình trạng hoạt động chung của TẤT CẢ các dịch vụ AWS tại TẤT CẢ các Region trên toàn thế giới', 'CHỈ hiển thị các sự cố và thông báo ảnh hưởng trực tiếp tới TÀI NGUYÊN BẠN ĐANG SỬ DỤNG'],
            ['Thời gian lưu lịch sử', 'Lịch sử sự cố chung toàn cầu trong 12 tháng qua; cung cấp kênh tin tức RSS feeds', 'Lưu trữ các sự kiện, lịch bảo trì và thay đổi ảnh hưởng tới tài khoản của bạn'],
            ['Ví dụ thông báo', '"Dịch vụ Amazon S3 tại us-east-1 đang gặp sự cố gia tăng tỷ lệ lỗi 503"', '"Máy chủ EC2 instance i-01234567 của bạn bị lỗi phần cứng và sẽ được nghỉ hưu (retired) vào thứ 6"'],
            ['Khả năng tự động hóa', 'Xem thông tin thụ động qua web hoặc RSS', 'Tích hợp với Amazon EventBridge để tự động kích hoạt Lambda xử lý (ví dụ: tự động đổi máy chủ EC2)']
          ]
        },
        keyPointsEn: [
          'AWS Health Dashboard provides ongoing visibility into service performance and availability across AWS.',
          'Service History (Formerly AWS Service Health Dashboard): Publicly accessible status page displaying the general operational health of all AWS services across all regions for the past 12 months; provides RSS feeds.',
          'Your Account (Formerly Personal Health Dashboard): Personalized view showing alerts and proactive notifications when AWS events directly affect your account resources.',
          'Proactive Maintenance Alerts: Informs you well in advance if your EC2 instance is on hardware scheduled for retirement or if a managed database maintenance window is pending.',
          'EventBridge Integration: Health events in "Your Account" can automatically trigger EventBridge rules to send alerts to Slack/Teams or execute automated remediation workflows via AWS Lambda.',
          'AWS Organizations integration: Enterprise administrators can view an aggregated health dashboard across all member accounts in their organization.'
        ],
        keyPointsVi: [
          'AWS Health Dashboard cung cấp cái nhìn xuyên suốt về hiệu năng và tính sẵn sàng của các dịch vụ trên toàn hệ sinh thái AWS.',
          'Service History (Tên cũ: Service Health Dashboard): Trang trạng thái công khai cho biết tình trạng chung của mọi dịch vụ AWS ở mọi Region trong 12 tháng qua; hỗ trợ RSS feed.',
          'Your Account (Tên cũ: Personal Health Dashboard): Chế độ xem cá nhân hóa đưa ra các cảnh báo khi có sự cố AWS ảnh hưởng trực tiếp đến tài nguyên trong tài khoản của bạn.',
          'Cảnh báo bảo trì chủ động: Báo trước nhiều ngày nếu máy chủ EC2 của bạn đang nằm trên phần cứng sắp hết hạn sử dụng (Hardware Retirement) hoặc có lịch cập nhật cơ sở dữ liệu.',
          'Tích hợp tự động hóa qua EventBridge: Sự kiện từ "Your Account" có thể kích hoạt EventBridge Rule để bắn thông báo vào Slack/Teams hoặc chạy Lambda tự động khắc phục.',
          'Tích hợp AWS Organizations: Quản trị viên doanh nghiệp có thể xem bảng điều khiển tổng hợp sức khỏe tài nguyên của tất cả các tài khoản con trong một màn hình duy nhất.'
        ],
        isCore: true
      },
      {
        id: 'lec-164',
        number: 164,
        titleEn: 'AWS Health Dashboard Hands-On',
        titleVi: 'Thực hành AWS Health Dashboard (Open Issues, Scheduled Changes, Event Log & Tích hợp EventBridge)',
        summaryEn: 'Console navigation: Exploring the 4 primary tabs under Your Account (Open issues, Scheduled changes, Other notifications, Event log) and configuring EventBridge automated alerting.',
        summaryVi: 'Thực hành trên AWS Console: Khám phá 4 nhóm danh mục trong mục Your Account (Open issues - Sự cố đang mở, Scheduled changes - Lịch thay đổi bảo trì, Other notifications - Thông báo khác, Event log - Nhật ký sự kiện) và thiết lập EventBridge tự động gửi cảnh báo khi có lịch bảo trì phần cứng.',
        table: {
          headers: ['Danh mục trong Your Account', 'Nội dung hiển thị cụ thể', 'Hành động ứng phó của kỹ sư'],
          rows: [
            ['Open issues (Sự cố đang diễn ra)', 'Các sự cố AWS chưa được giải quyết đang gây gián đoạn trực tiếp cho tài nguyên của bạn', 'Kiểm tra danh sách tài nguyên bị ảnh hưởng, xem giải pháp khắc phục tạm thời do AWS đề xuất'],
            ['Scheduled changes (Lịch thay đổi đã lên)', 'Lịch bảo trì phần cứng, cập nhật phiên bản máy chủ EC2, bảo trì RDS, thay chứng chỉ SSL', 'Chủ động khởi động lại máy chủ vào khung giờ thấp điểm để chuyển sang phần cứng mới trước hạn chót'],
            ['Other notifications (Thông báo khác)', 'Cảnh báo bảo mật, thông báo phiên bản hết hạn hỗ trợ (End-of-Life runtimes: Node.js, Python)', 'Lập kế hoạch nâng cấp mã nguồn ứng dụng tương thích với các phiên bản runtime mới'],
            ['Event log (Nhật ký sự kiện)', 'Lịch sử toàn bộ các sự kiện sức khỏe đã diễn ra trong quá khứ', 'Xuất dữ liệu phục vụ báo cáo định kỳ SLA và tuân thủ kiểm toán an ninh']
          ]
        },
        keyPointsEn: [
          'Accessing AWS Health: Click the notification bell icon in the top navigation bar of the AWS Console or search for "Health Dashboard".',
          'Open Issues tab: Highlights any active service degradations mapped directly to your resource IDs (e.g., EBS volume degraded, EC2 instance impaired).',
          'Scheduled Changes tab: Crucial for production operations — provides exact dates and times for upcoming scheduled infrastructure changes.',
          'Setting up Automated Health Alerts: Create an EventBridge rule with Event Source `AWS Health`, Event Type `AWS Health Event`, and Target `SNS Topic` (Email/PagerDuty) or `Lambda`.',
          'Organizational View: With AWS Organizations enabled, navigate to "Organizational health" to see aggregated issues across all linked developer and production accounts.'
        ],
        keyPointsVi: [
          'Cách truy cập AWS Health: Nhấp vào biểu tượng chuông thông báo ở góc trên cùng bên phải thanh điều hướng Console hoặc gõ tìm kiếm "Health Dashboard".',
          'Tab Open Issues: Làm nổi bật mọi sự cố gián đoạn đang tác động trực tiếp tới ID tài nguyên của bạn (ví dụ: ổ đĩa EBS bị giảm tốc độ, máy chủ EC2 bị trục trặc).',
          'Tab Scheduled Changes: Cực kỳ quan trọng đối với vận hành Production — cung cấp ngày giờ chính xác của các đợt bảo trì hạ tầng sắp diễn ra.',
          'Thiết lập cảnh báo tự động: Tạo EventBridge Rule với nguồn sự kiện `AWS Health`, loại sự kiện `AWS Health Event`, đích đến là `SNS Topic` (Email/SMS) hoặc `Lambda`.',
          'Chế độ xem tổ chức (Organizational Health): Khi bật tính năng trong AWS Organizations, quản trị viên có thể xem bức tranh toàn cảnh sức khỏe tài nguyên của mọi tài khoản con.'
        ],
        isCore: true
      },
      {
        id: 'lec-165',
        number: 165,
        titleEn: 'Cloud Monitoring Summary & Master Exam Decision Matrix',
        titleVi: 'Tổng kết Giám sát Đám mây & Siêu Ma trận Quyết định Đề thi AWS CCP',
        summaryEn: 'The definitive exam cheat sheet comparing CloudWatch (Metrics/Alarms/Logs), Amazon EventBridge, AWS CloudTrail, AWS X-Ray, and AWS Health Dashboard with high-frequency scenario mappings and keyword associations.',
        summaryVi: 'Bảng tổng kết cứu cánh phòng thi đối chiếu 5 dịch vụ giám sát và vận hành cốt lõi: CloudWatch (Metrics/Alarms/Logs), Amazon EventBridge, AWS CloudTrail, AWS X-Ray và AWS Health Dashboard kèm theo kịch bản tình huống đề thi và từ khóa quyết định chính xác 100%.',
        table: {
          headers: ['Nếu đề bài thi yêu cầu...', 'Dịch vụ AWS bạn cần chọn ngay', 'Bản chất cơ chế', 'Từ khóa trúng đề thi (Keywords)'],
          rows: [
            ['Theo dõi số liệu hiệu năng máy chủ (CPU, RAM, Disk, Network) và tạo ngưỡng cảnh báo kích hoạt Auto Scaling', 'Amazon CloudWatch Metrics & Alarms', 'Thu thập chỉ số thời gian thực, đánh giá ngưỡng và phát tín hiệu cảnh báo', 'Metrics, Alarms, CPUUtilization, Detailed Monitoring 1 min, Unified Agent for RAM, Auto Scaling action, SNS'],
            ['Gom log tập trung từ nhiều máy chủ và hàm Lambda, tìm kiếm phân tích lỗi bằng câu truy vấn tương tác', 'Amazon CloudWatch Logs & Logs Insights', 'Lưu trữ log tập trung, phân tích bằng cú pháp truy vấn, lọc log thành chỉ số', 'Centralized log repository, Log Groups, Logs Insights, Metric Filter, Retention policy, Never Expire'],
            ['Phản ứng tự động khi tài nguyên AWS thay đổi trạng thái hoặc lên lịch chạy tác vụ định kỳ kiểu cron job', 'Amazon EventBridge (CloudWatch Events)', 'Nền tảng Bus sự kiện không máy chủ định tuyến theo Event Pattern hoặc Cron/Rate schedule', 'Event-driven, Serverless cron schedule, React to state changes, Event bus (Default, Partner, Custom), Rule & Targets'],
            ['Kiểm toán xem AI đã thực hiện lệnh gọi API nào, vào lúc nào, từ địa chỉ IP nào để phục vụ điều tra bảo mật', 'AWS CloudTrail', 'Ghi lại toàn bộ lịch sử các lệnh gọi API từ Console, CLI, SDK vào file JSON kiểm toán', 'Audit API calls, Governance, Compliance, Who did what and when, 90 days Event History, Multi-Region Trail to S3'],
            ['Truy vết phân tán các request đi qua hệ thống Microservices, vẽ sơ đồ trực quan và tìm điểm nghẽn độ trễ', 'AWS X-Ray', 'Distributed tracing xuyên suốt các thành phần phân tán với Trace ID và Service Map', 'Distributed tracing, Microservices, Service Map, Trace ID, Latency bottlenecks, Root cause analysis, Subsegments'],
            ['Kiểm tra xem toàn bộ một Region hoặc dịch vụ chung của AWS có đang bị sập hay không (không cần đăng nhập)', 'AWS Health Dashboard (Service History)', 'Trang trạng thái công khai hiển thị tính sẵn sàng chung của mọi dịch vụ AWS trên toàn cầu', 'Public status page, Global service availability, 12 months history, No login required, RSS feed'],
            ['Nhận thông báo chủ động khi máy chủ của BẠN nằm trên phần cứng sắp bảo trì hoặc tài nguyên của bạn bị ảnh hưởng', 'AWS Health Dashboard (Your Account)', 'Bảng điều khiển cá nhân hóa hiển thị sự kiện tác động trực tiếp tới tài nguyên của tài khoản', 'Personal Health Dashboard, Proactive maintenance, Hardware retirement, Direct impact to YOUR resources, Scheduled changes']
          ]
        },
        keyPointsEn: [
          'CloudWatch vs CloudTrail: CloudWatch monitors PERFORMANCE (Metrics, Alarms, Logs); CloudTrail audits ACTIONS (API calls: who did what, when).',
          'CloudWatch Metrics: RAM / Memory is NEVER a default metric for EC2 — requires the Unified CloudWatch Agent!',
          'CloudWatch Alarms: 3 states (OK, ALARM, INSUFFICIENT_DATA); triggers Auto Scaling, EC2 actions (Reboot/Recover/Stop), or SNS notifications.',
          'EventBridge (CloudWatch Events): Serverless event bus for reacting to AWS events and scheduling cron jobs.',
          'AWS CloudTrail: Enabled by default with 90 days of free Event History; create a Trail to deliver logs to S3 indefinitely.',
          'AWS X-Ray: Distributed tracing and visual Service Map for microservices to find performance latency bottlenecks and root causes.',
          'Health Dashboard distinction: Service History = general public status of AWS services worldwide; Your Account (Personal Health) = personalized alerts directly impacting your resources.'
        ],
        keyPointsVi: [
          'Phân biệt kinh điển CloudWatch vs CloudTrail: CloudWatch đo đạc HIỆU NĂNG và TÌNH TRẠNG (CPU, RAM, Log); CloudTrail kiểm toán HÀNH ĐỘNG người dùng (API calls: ai làm gì, khi nào).',
          'CloudWatch Metrics: RAM / Bộ nhớ KHÔNG BAO GIỜ là metric mặc định của EC2 — muốn đo bắt buộc phải cài Unified CloudWatch Agent!',
          'CloudWatch Alarms: 3 trạng thái (OK, ALARM, INSUFFICIENT_DATA); kích hoạt Auto Scaling, hành động EC2 (Reboot/Recover/Stop) hoặc thông báo SNS.',
          'EventBridge (CloudWatch Events): Nền tảng bus sự kiện serverless để phản ứng với sự kiện AWS và lên lịch chạy cron job.',
          'AWS CloudTrail: Bật sẵn mặc định 90 ngày Event History miễn phí; muốn lưu lâu hơn phải tạo Trail xuất ra S3.',
          'AWS X-Ray: Truy vết phân tán (Distributed tracing) và vẽ sơ đồ Service Map cho microservices để tìm điểm nghẽn độ trễ và nguyên nhân gốc rễ.',
          'Phân biệt Health Dashboard: Service History = tình trạng công khai chung của AWS toàn cầu; Your Account (Personal Health) = cảnh báo ảnh hưởng trực tiếp tới tài nguyên của chính bạn.'
        ],
        isCore: true
      }
    ]
  }
];

