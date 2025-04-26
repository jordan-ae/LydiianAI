import type { GraphData } from "./types"

export const mockGraphData: GraphData = {
  nodes: [
    // Core AI Concepts
    {
      id: "1",
      name: "Machine Learning",
      type: "pdf",
      importance: 1.0,
      summary:
        "Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy. It enables computers to learn from data without being explicitly programmed.",
      keywords: ["AI", "Algorithms", "Neural Networks", "Deep Learning"],
      references: [
        {
          title: "Introduction to Machine Learning",
          context:
            "Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so.",
          url: "#",
        },
        {
          title: "Advanced Machine Learning Techniques",
          context:
            "Recent advances in machine learning have led to breakthroughs in computer vision, natural language processing, and reinforcement learning.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "2",
          targetName: "Neural Networks",
          relationshipType: "Parent-Child",
          description: "Machine Learning encompasses Neural Networks as one of its key implementation techniques.",
        },
        {
          targetId: "5",
          targetName: "Data Science",
          relationshipType: "Related Field",
          description:
            "Machine Learning is closely related to Data Science, with overlapping methodologies and applications.",
        },
      ],
    },
    {
      id: "2",
      name: "Neural Networks",
      type: "pdf",
      importance: 0.9,
      summary:
        "Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains. They are a core component of deep learning algorithms and can learn to recognize patterns, classify data, and forecast future events.",
      keywords: ["Deep Learning", "Backpropagation", "Activation Functions", "Layers"],
      references: [
        {
          title: "Neural Networks and Deep Learning",
          context:
            "Neural networks consist of layers of interconnected nodes, each layer processing information and passing it to the next layer.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "3",
          targetName: "Convolutional Neural Networks",
          relationshipType: "Parent-Child",
          description: "Neural Networks are the foundation for specialized architectures like CNNs.",
        },
      ],
    },
    {
      id: "3",
      name: "Convolutional Neural Networks",
      type: "article",
      importance: 0.8,
      summary:
        "Convolutional Neural Networks (CNNs) are a class of deep neural networks most commonly applied to analyzing visual imagery. They use a mathematical operation called convolution in place of general matrix multiplication in at least one of their layers, making them particularly effective for image processing tasks.",
      keywords: ["Computer Vision", "Image Recognition", "Convolution", "Pooling"],
      references: [
        {
          title: "Understanding Convolutional Neural Networks",
          context:
            "CNNs use convolutional layers that apply convolution operations to the input, passing the result to the next layer.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "7",
          targetName: "Computer Vision",
          relationshipType: "Applied In",
          description: "CNNs are the primary neural network architecture used in modern computer vision applications.",
        },
      ],
    },
    {
      id: "4",
      name: "Reinforcement Learning",
      type: "article",
      importance: 0.85,
      summary:
        "Reinforcement learning is an area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward. Unlike supervised learning, it focuses on finding a balance between exploration of unknown territory and exploitation of current knowledge.",
      keywords: ["Agents", "Rewards", "Policy Optimization", "Q-Learning", "Environment"],
      references: [
        {
          title: "Introduction to Reinforcement Learning",
          context:
            "Reinforcement learning differs from supervised learning in that labeled input/output pairs need not be presented, and sub-optimal actions need not be explicitly corrected.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Child-Parent",
          description: "Reinforcement Learning is a specialized branch of Machine Learning.",
        },
      ],
    },
    {
      id: "5",
      name: "Data Science",
      type: "pdf",
      importance: 0.95,
      summary:
        "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data. It combines expertise from statistics, computer science, and domain knowledge to analyze complex data and solve real-world problems.",
      keywords: ["Big Data", "Statistics", "Data Mining", "Visualization", "Analytics"],
      references: [
        {
          title: "Fundamentals of Data Science",
          context:
            "Data science combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Related Field",
          description:
            "Data Science and Machine Learning have significant overlap, with ML being a key tool in the data scientist's toolkit.",
        },
      ],
    },
    {
      id: "6",
      name: "Natural Language Processing",
      type: "article",
      importance: 0.85,
      summary:
        "Natural Language Processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language. It enables computers to read, understand, and derive meaning from human languages, allowing for applications like translation, sentiment analysis, and text generation.",
      keywords: ["Text Analysis", "Sentiment Analysis", "Language Models", "Translation", "Text Generation"],
      references: [
        {
          title: "Advanced NLP Techniques",
          context:
            "Modern NLP approaches use deep learning methods to achieve state-of-the-art results on various language tasks.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "8",
          targetName: "Transformer Models",
          relationshipType: "Uses",
          description: "Modern NLP relies heavily on transformer-based architectures for state-of-the-art performance.",
        },
      ],
    },
    {
      id: "7",
      name: "Computer Vision",
      type: "pdf",
      importance: 0.8,
      summary:
        "Computer vision is an interdisciplinary scientific field that deals with how computers can gain high-level understanding from digital images or videos. It seeks to automate tasks that the human visual system can do, enabling machines to identify and process objects in images and videos in the same way that humans do.",
      keywords: [
        "Image Processing",
        "Object Detection",
        "Image Segmentation",
        "Facial Recognition",
        "Scene Understanding",
      ],
      references: [
        {
          title: "Computer Vision: Algorithms and Applications",
          context:
            "Computer vision tasks include methods for acquiring, processing, analyzing and understanding digital images.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "3",
          targetName: "Convolutional Neural Networks",
          relationshipType: "Uses",
          description: "Computer Vision heavily relies on CNNs for image analysis and understanding.",
        },
      ],
    },
    {
      id: "8",
      name: "Transformer Models",
      type: "article",
      importance: 0.9,
      summary:
        "Transformer models are a type of neural network architecture that has revolutionized natural language processing and other sequence tasks through the use of self-attention mechanisms. Unlike previous sequence models, transformers process entire sequences simultaneously, allowing for more efficient training and better capture of long-range dependencies.",
      keywords: ["Attention Mechanism", "BERT", "GPT", "Self-Attention", "Encoder-Decoder"],
      references: [
        {
          title: "Attention Is All You Need",
          context:
            "The transformer architecture introduced in this paper has become the foundation for most state-of-the-art NLP models.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "6",
          targetName: "Natural Language Processing",
          relationshipType: "Revolutionizes",
          description: "Transformer models have fundamentally changed how NLP tasks are approached and solved.",
        },
      ],
    },
    {
      id: "9",
      name: "Generative AI",
      type: "article",
      importance: 0.95,
      summary:
        "Generative AI refers to artificial intelligence systems that can generate new content, including text, images, audio, and video, that resembles human-created content. These systems learn patterns from existing data and use that knowledge to create novel outputs that maintain the characteristics of the training data while producing something new.",
      keywords: ["GANs", "Diffusion Models", "Text-to-Image", "Content Generation", "Synthetic Media"],
      references: [
        {
          title: "The Rise of Generative AI",
          context:
            "Recent advances in generative models have enabled the creation of highly realistic synthetic content across multiple modalities.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "8",
          targetName: "Transformer Models",
          relationshipType: "Powered By",
          description: "Many generative AI systems rely on transformer architectures for their capabilities.",
        },
      ],
    },
    {
      id: "10",
      name: "Ethics in AI",
      type: "pdf",
      importance: 0.85,
      summary:
        "Ethics in AI addresses the moral implications and responsibilities associated with artificial intelligence systems, including issues of bias, fairness, transparency, and accountability. As AI becomes more integrated into society, ensuring these systems are developed and deployed ethically becomes increasingly important for preventing harm and promoting beneficial outcomes.",
      keywords: ["Bias", "Fairness", "Transparency", "Accountability", "Privacy", "Regulation"],
      references: [
        {
          title: "Ethical Considerations in AI Development",
          context:
            "As AI systems become more prevalent, ensuring they are developed and deployed ethically becomes increasingly important.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "9",
          targetName: "Generative AI",
          relationshipType: "Scrutinizes",
          description:
            "Ethical frameworks are particularly important for evaluating the impacts of generative AI technologies.",
        },
      ],
    },

    // Additional Nodes
    {
      id: "11",
      name: "Deep Learning",
      type: "pdf",
      importance: 0.9,
      summary:
        "Deep Learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to analyze various factors of data. It is particularly powerful for finding patterns in unstructured data like images, sound, and text, and has enabled significant advances in many AI applications.",
      keywords: ["Neural Networks", "Backpropagation", "Feature Learning", "Representation Learning"],
      references: [
        {
          title: "Deep Learning: A Comprehensive Guide",
          context:
            "This book provides a thorough introduction to the principles and applications of deep learning across various domains.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Subset Of",
          description:
            "Deep Learning is a specialized subset of Machine Learning focused on neural networks with many layers.",
        },
      ],
    },
    {
      id: "12",
      name: "Large Language Models",
      type: "article",
      importance: 0.95,
      summary:
        "Large Language Models (LLMs) are advanced AI systems trained on vast amounts of text data to understand and generate human language. These models, like GPT-4, Claude, and LLaMA, can perform a wide range of language tasks including writing, translation, coding, and creative content generation with remarkable fluency and contextual understanding.",
      keywords: ["NLP", "GPT", "Text Generation", "Few-shot Learning", "Prompt Engineering"],
      references: [
        {
          title: "The Scaling Hypothesis in Language Models",
          context:
            "This research explores how increasing model size and training data leads to emergent capabilities in large language models.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "8",
          targetName: "Transformer Models",
          relationshipType: "Based On",
          description: "Modern LLMs are built using transformer architectures as their foundational design.",
        },
      ],
    },
    {
      id: "13",
      name: "Computer Graphics",
      type: "pdf",
      importance: 0.75,
      summary:
        "Computer Graphics is the field concerned with digitally synthesizing and manipulating visual content. It encompasses techniques for creating, processing, and rendering images, animations, and 3D models, forming the foundation for visual effects, video games, simulations, and visualization tools.",
      keywords: ["Rendering", "3D Modeling", "Animation", "Visualization", "Ray Tracing"],
      references: [
        {
          title: "Fundamentals of Computer Graphics",
          context:
            "This textbook covers the mathematical and algorithmic foundations of creating and manipulating digital images.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "7",
          targetName: "Computer Vision",
          relationshipType: "Related Field",
          description:
            "While Computer Vision analyzes images to extract meaning, Computer Graphics creates images from models.",
        },
      ],
    },
    {
      id: "14",
      name: "Robotics",
      type: "article",
      importance: 0.8,
      summary:
        "Robotics is an interdisciplinary field that integrates computer science, engineering, and artificial intelligence to design, construct, and operate robots. Modern robotics combines mechanical systems with sophisticated AI to create machines that can perceive their environment, make decisions, and perform complex tasks autonomously.",
      keywords: ["Automation", "Perception", "Motion Planning", "Control Systems", "Human-Robot Interaction"],
      references: [
        {
          title: "Modern Robotics: Mechanics, Planning, and Control",
          context:
            "This comprehensive text covers the mathematical foundations and algorithmic approaches used in contemporary robotics.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "4",
          targetName: "Reinforcement Learning",
          relationshipType: "Uses",
          description:
            "Robotics often employs reinforcement learning for developing control policies in physical systems.",
        },
      ],
    },
    {
      id: "15",
      name: "Quantum Computing",
      type: "pdf",
      importance: 0.85,
      summary:
        "Quantum Computing leverages quantum mechanics principles to process information in fundamentally different ways than classical computers. By using quantum bits (qubits) that can exist in multiple states simultaneously through superposition and entanglement, quantum computers have the potential to solve certain problems exponentially faster than traditional computers.",
      keywords: ["Qubits", "Superposition", "Entanglement", "Quantum Algorithms", "Quantum Supremacy"],
      references: [
        {
          title: "Introduction to Quantum Computing",
          context:
            "This paper provides an accessible overview of quantum computing principles and their implications for computational theory.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Enhances",
          description: "Quantum computing may significantly accelerate certain types of machine learning algorithms.",
        },
      ],
    },
    {
      id: "16",
      name: "Federated Learning",
      type: "article",
      importance: 0.8,
      summary:
        "Federated Learning is a machine learning approach that trains algorithms across multiple decentralized devices or servers holding local data samples, without exchanging them. This enables machine learning models to be trained while keeping the data on the device, addressing privacy concerns and reducing data transfer requirements.",
      keywords: ["Privacy", "Decentralized Learning", "On-device Learning", "Distributed Computing"],
      references: [
        {
          title: "Advances in Federated Learning",
          context:
            "Federated learning allows for smarter models, lower latency, and less power consumption, all while ensuring privacy.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Technique Of",
          description: "Federated Learning is a specialized technique within the broader field of Machine Learning.",
        },
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Addresses",
          description: "Federated Learning addresses privacy concerns that are central to ethical AI development.",
        },
      ],
    },
    {
      id: "17",
      name: "Explainable AI",
      type: "pdf",
      importance: 0.85,
      summary:
        "Explainable AI (XAI) refers to methods and techniques in the application of artificial intelligence such that the results of the solution can be understood by humans. It contrasts with the concept of the 'black box' in machine learning where even the designers cannot explain why an AI arrived at a specific decision.",
      keywords: ["Interpretability", "Transparency", "Model Explanation", "Feature Importance", "Trust"],
      references: [
        {
          title: "Methods for Explainable AI",
          context:
            "This paper surveys various techniques for making AI systems more interpretable and their decisions more transparent to users.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Enables",
          description: "Explainable AI enables ethical oversight by making AI decision-making transparent.",
        },
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Enhances",
          description: "Explainable AI enhances machine learning by adding interpretability to models.",
        },
      ],
    },
    {
      id: "18",
      name: "Computer Networks",
      type: "pdf",
      importance: 0.75,
      summary:
        "Computer Networks encompass the infrastructure, protocols, and software that enable digital communication between devices. From local area networks to the global internet, computer networks form the backbone of modern digital systems, enabling data exchange, resource sharing, and distributed computing.",
      keywords: ["Internet", "Protocols", "Routing", "TCP/IP", "Distributed Systems"],
      references: [
        {
          title: "Fundamentals of Computer Networks",
          context:
            "This comprehensive guide covers the principles of network architecture, protocols, and communication systems.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "16",
          targetName: "Federated Learning",
          relationshipType: "Enables",
          description: "Computer Networks enable the distributed nature of Federated Learning systems.",
        },
        {
          targetId: "19",
          targetName: "Cloud Computing",
          relationshipType: "Underlies",
          description: "Computer Networks form the foundation upon which Cloud Computing is built.",
        },
      ],
    },
    {
      id: "19",
      name: "Cloud Computing",
      type: "article",
      importance: 0.8,
      summary:
        "Cloud Computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ('the cloud') to offer faster innovation, flexible resources, and economies of scale. It has revolutionized how businesses and individuals access and utilize computing resources.",
      keywords: ["IaaS", "PaaS", "SaaS", "Virtualization", "Scalability", "On-demand Computing"],
      references: [
        {
          title: "Cloud Computing: Concepts and Paradigms",
          context:
            "This book explores the fundamental concepts, architectural principles, and applications of cloud computing.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "5",
          targetName: "Data Science",
          relationshipType: "Enables",
          description:
            "Cloud Computing enables Data Science by providing scalable computing resources for big data processing.",
        },
        {
          targetId: "20",
          targetName: "Edge Computing",
          relationshipType: "Complements",
          description: "Cloud Computing is complemented by Edge Computing in modern distributed architectures.",
        },
      ],
    },
    {
      id: "20",
      name: "Edge Computing",
      type: "article",
      importance: 0.75,
      summary:
        "Edge Computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed, to improve response times and save bandwidth. It enables processing data locally at the edge of the network, reducing latency for critical applications.",
      keywords: ["IoT", "Distributed Computing", "Low Latency", "Bandwidth Optimization", "Local Processing"],
      references: [
        {
          title: "The Rise of Edge Computing",
          context:
            "Edge computing addresses the limitations of cloud computing for applications requiring real-time processing and reduced latency.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "19",
          targetName: "Cloud Computing",
          relationshipType: "Complements",
          description: "Edge Computing complements Cloud Computing by handling time-sensitive processing locally.",
        },
        {
          targetId: "21",
          targetName: "Internet of Things",
          relationshipType: "Enables",
          description: "Edge Computing enables more efficient IoT deployments by processing data closer to the source.",
        },
      ],
    },
    {
      id: "21",
      name: "Internet of Things",
      type: "pdf",
      importance: 0.8,
      summary:
        "The Internet of Things (IoT) describes the network of physical objects embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices and systems over the internet. These devices range from ordinary household objects to sophisticated industrial tools.",
      keywords: ["Connected Devices", "Sensors", "Smart Homes", "Industrial IoT", "Embedded Systems"],
      references: [
        {
          title: "IoT Architecture and Protocols",
          context:
            "IoT systems use various communication protocols and architectures to enable seamless device connectivity and data exchange.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "20",
          targetName: "Edge Computing",
          relationshipType: "Utilizes",
          description: "IoT increasingly utilizes Edge Computing to process data closer to the source.",
        },
        {
          targetId: "5",
          targetName: "Data Science",
          relationshipType: "Generates Data For",
          description: "IoT generates vast amounts of data that can be analyzed using Data Science techniques.",
        },
      ],
    },
    {
      id: "22",
      name: "Augmented Reality",
      type: "article",
      importance: 0.75,
      summary:
        "Augmented Reality (AR) is an interactive experience that enhances the real world with computer-generated perceptual information. AR overlays digital content onto the real world, creating a mixed reality where virtual objects appear to coexist with the physical environment.",
      keywords: ["Mixed Reality", "Spatial Computing", "Computer Vision", "3D Rendering", "Interactive Experiences"],
      references: [
        {
          title: "Augmented Reality Applications",
          context:
            "AR applications span industries from gaming and entertainment to healthcare, education, and industrial maintenance.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "7",
          targetName: "Computer Vision",
          relationshipType: "Depends On",
          description: "Augmented Reality depends on Computer Vision for environmental understanding and tracking.",
        },
        {
          targetId: "13",
          targetName: "Computer Graphics",
          relationshipType: "Utilizes",
          description:
            "Augmented Reality utilizes Computer Graphics for rendering virtual objects in real environments.",
        },
      ],
    },
    {
      id: "23",
      name: "Virtual Reality",
      type: "pdf",
      importance: 0.75,
      summary:
        "Virtual Reality (VR) is a simulated experience that can be similar to or completely different from the real world. It immerses users in a fully artificial digital environment, typically through the use of headsets that block out the physical world and present a digital alternative.",
      keywords: ["Immersion", "3D Environments", "Headsets", "Spatial Audio", "Interactive Simulation"],
      references: [
        {
          title: "Virtual Reality Technologies",
          context:
            "VR technologies create immersive experiences through a combination of visual, auditory, and sometimes haptic feedback.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "22",
          targetName: "Augmented Reality",
          relationshipType: "Related To",
          description: "Virtual Reality is related to Augmented Reality as part of the extended reality spectrum.",
        },
        {
          targetId: "13",
          targetName: "Computer Graphics",
          relationshipType: "Depends On",
          description: "Virtual Reality depends on advanced Computer Graphics for realistic rendering.",
        },
      ],
    },
    {
      id: "24",
      name: "Blockchain",
      type: "article",
      importance: 0.8,
      summary:
        "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. It provides a transparent, immutable, and decentralized way to record transactions across many computers.",
      keywords: ["Distributed Ledger", "Cryptography", "Smart Contracts", "Decentralization", "Consensus Mechanisms"],
      references: [
        {
          title: "Blockchain: Principles and Applications",
          context:
            "This book explores the fundamental concepts of blockchain technology and its applications beyond cryptocurrencies.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "18",
          targetName: "Computer Networks",
          relationshipType: "Built On",
          description: "Blockchain is built on distributed computer network principles.",
        },
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Addresses",
          description: "Blockchain addresses trust and transparency issues that are relevant to AI ethics.",
        },
      ],
    },
    {
      id: "25",
      name: "Cybersecurity",
      type: "pdf",
      importance: 0.85,
      summary:
        "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks often aim to access, change, or destroy sensitive information, extort money from users, or interrupt normal business processes. Effective cybersecurity reduces the risk of cyber attacks and protects organizations and individuals from unauthorized exploitation of systems, networks, and technologies.",
      keywords: ["Security", "Encryption", "Threat Detection", "Vulnerability Management", "Network Security"],
      references: [
        {
          title: "Principles of Cybersecurity",
          context: "This comprehensive guide covers the fundamental principles and practices of modern cybersecurity.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "18",
          targetName: "Computer Networks",
          relationshipType: "Protects",
          description: "Cybersecurity protects Computer Networks from unauthorized access and attacks.",
        },
        {
          targetId: "24",
          targetName: "Blockchain",
          relationshipType: "Enhances",
          description: "Cybersecurity principles enhance the security aspects of Blockchain implementations.",
        },
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Overlaps With",
          description: "Cybersecurity overlaps with Ethics in AI in areas of privacy, security, and trust.",
        },
      ],
    },
    {
      id: "26",
      name: "Human-Computer Interaction",
      type: "article",
      importance: 0.8,
      summary:
        "Human-Computer Interaction (HCI) is a multidisciplinary field that focuses on the design of computer technology and the interaction between humans and computers. It studies the ways in which humans interact with computers and designs technologies that allow humans to interact with computers in novel ways.",
      keywords: ["User Experience", "Interface Design", "Usability", "Accessibility", "Interaction Design"],
      references: [
        {
          title: "Fundamentals of Human-Computer Interaction",
          context:
            "This book explores the principles of designing effective, efficient, and satisfying interactions between humans and computers.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "22",
          targetName: "Augmented Reality",
          relationshipType: "Informs",
          description: "HCI principles inform the design of effective Augmented Reality interfaces.",
        },
        {
          targetId: "23",
          targetName: "Virtual Reality",
          relationshipType: "Informs",
          description: "HCI principles inform the design of immersive and usable Virtual Reality experiences.",
        },
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Considers",
          description: "HCI considers ethical implications of how humans interact with AI systems.",
        },
      ],
    },
    {
      id: "27",
      name: "Bioinformatics",
      type: "pdf",
      importance: 0.75,
      summary:
        "Bioinformatics is an interdisciplinary field that develops methods and software tools for understanding biological data, particularly large and complex data sets. It combines biology, computer science, information engineering, mathematics and statistics to analyze and interpret biological data.",
      keywords: [
        "Genomics",
        "Computational Biology",
        "Sequence Analysis",
        "Structural Bioinformatics",
        "Systems Biology",
      ],
      references: [
        {
          title: "Introduction to Bioinformatics",
          context:
            "This textbook provides a comprehensive introduction to the computational methods used to analyze biological data.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "5",
          targetName: "Data Science",
          relationshipType: "Applies",
          description: "Bioinformatics applies Data Science techniques to biological data.",
        },
        {
          targetId: "1",
          targetName: "Machine Learning",
          relationshipType: "Utilizes",
          description: "Bioinformatics utilizes Machine Learning for pattern recognition in biological data.",
        },
      ],
    },
    {
      id: "28",
      name: "Digital Twin",
      type: "article",
      importance: 0.7,
      summary:
        "A Digital Twin is a virtual representation that serves as the real-time digital counterpart of a physical object or process. It uses real-world data to create simulations that can predict how a physical asset will perform, enabling optimization, monitoring, and improved decision-making in various industries.",
      keywords: ["Simulation", "IoT", "Predictive Maintenance", "Virtual Modeling", "Real-time Analytics"],
      references: [
        {
          title: "Digital Twin Technology",
          context:
            "Digital twins integrate IoT, AI, and data analytics to create living digital simulation models that update and change as their physical counterparts change.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "21",
          targetName: "Internet of Things",
          relationshipType: "Leverages",
          description: "Digital Twins leverage IoT data to create accurate virtual representations.",
        },
        {
          targetId: "5",
          targetName: "Data Science",
          relationshipType: "Utilizes",
          description: "Digital Twins utilize Data Science for analyzing and predicting system behavior.",
        },
      ],
    },
    {
      id: "29",
      name: "Autonomous Vehicles",
      type: "article",
      importance: 0.85,
      summary:
        "Autonomous Vehicles are vehicles capable of sensing their environment and operating without human involvement. They combine sensors, algorithms, and powerful processors to perceive surroundings and make driving decisions, potentially revolutionizing transportation safety and efficiency.",
      keywords: ["Self-driving Cars", "Computer Vision", "Sensor Fusion", "Path Planning", "Decision Making"],
      references: [
        {
          title: "Autonomous Vehicle Technology",
          context:
            "This paper explores the technical challenges and solutions in developing reliable autonomous driving systems.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "7",
          targetName: "Computer Vision",
          relationshipType: "Relies On",
          description: "Autonomous Vehicles rely on Computer Vision for environmental perception.",
        },
        {
          targetId: "4",
          targetName: "Reinforcement Learning",
          relationshipType: "Applies",
          description: "Autonomous Vehicles apply Reinforcement Learning for decision-making and control.",
        },
        {
          targetId: "10",
          targetName: "Ethics in AI",
          relationshipType: "Raises Questions",
          description: "Autonomous Vehicles raise important ethical questions about safety and decision-making.",
        },
      ],
    },
    {
      id: "30",
      name: "Computational Linguistics",
      type: "pdf",
      importance: 0.75,
      summary:
        "Computational Linguistics is an interdisciplinary field concerned with the computational modeling of natural language. It combines linguistics, computer science, and artificial intelligence to develop systems capable of processing and understanding human language in all its forms.",
      keywords: ["Natural Language", "Parsing", "Semantics", "Syntax", "Language Models", "Corpus Linguistics"],
      references: [
        {
          title: "Foundations of Computational Linguistics",
          context:
            "This book covers the theoretical foundations and practical applications of computational approaches to language analysis.",
          url: "#",
        },
      ],
      connections: [
        {
          targetId: "6",
          targetName: "Natural Language Processing",
          relationshipType: "Underlies",
          description: "Computational Linguistics provides the theoretical foundation for NLP applications.",
        },
        {
          targetId: "12",
          targetName: "Large Language Models",
          relationshipType: "Informs",
          description: "Computational Linguistics informs the development of Large Language Models.",
        },
      ],
    },
  ],
  links: [
    // Core AI Connections
    { source: "1", target: "2", strength: 0.9, type: "includes" },
    { source: "1", target: "4", strength: 0.8, type: "includes" },
    { source: "1", target: "5", strength: 0.7, type: "related_to" },
    { source: "1", target: "6", strength: 0.7, type: "includes" },
    { source: "1", target: "7", strength: 0.7, type: "includes" },
    { source: "1", target: "11", strength: 0.9, type: "includes" },
    { source: "2", target: "3", strength: 0.9, type: "specialization" },
    { source: "2", target: "8", strength: 0.6, type: "related_to" },
    { source: "3", target: "7", strength: 0.8, type: "applied_in" },
    { source: "4", target: "9", strength: 0.5, type: "contributes_to" },
    { source: "4", target: "10", strength: 0.5, type: "raises_concerns" },
    { source: "5", target: "6", strength: 0.6, type: "analyzes" },
    { source: "5", target: "7", strength: 0.6, type: "analyzes" },
    { source: "6", target: "8", strength: 0.9, type: "uses" },
    { source: "6", target: "9", strength: 0.7, type: "contributes_to" },
    { source: "7", target: "9", strength: 0.7, type: "contributes_to" },
    { source: "7", target: "13", strength: 0.6, type: "related_to" },
    { source: "7", target: "14", strength: 0.7, type: "incorporated_in" },
    { source: "8", target: "9", strength: 0.8, type: "enables" },
    { source: "8", target: "12", strength: 0.9, type: "powers" },
    { source: "9", target: "10", strength: 0.7, type: "raises_concerns" },
    { source: "11", target: "2", strength: 0.8, type: "uses" },
    { source: "11", target: "3", strength: 0.7, type: "includes" },

    // Additional Connections
    { source: "12", target: "6", strength: 0.9, type: "advances" },
    { source: "12", target: "8", strength: 0.9, type: "based_on" },
    { source: "12", target: "9", strength: 0.8, type: "type_of" },
    { source: "12", target: "10", strength: 0.7, type: "raises_concerns" },
    { source: "13", target: "9", strength: 0.5, type: "enhances" },
    { source: "14", target: "4", strength: 0.7, type: "uses" },
    { source: "14", target: "10", strength: 0.6, type: "considers" },
    { source: "15", target: "1", strength: 0.5, type: "may_enhance" },
    { source: "15", target: "11", strength: 0.4, type: "may_transform" },
    { source: "16", target: "1", strength: 0.7, type: "technique_of" },
    { source: "16", target: "10", strength: 0.8, type: "addresses" },
    { source: "17", target: "1", strength: 0.7, type: "enhances" },
    { source: "17", target: "10", strength: 0.9, type: "enables" },
    { source: "18", target: "16", strength: 0.6, type: "enables" },
    { source: "18", target: "19", strength: 0.8, type: "underlies" },
    { source: "19", target: "5", strength: 0.7, type: "enables" },
    { source: "19", target: "20", strength: 0.7, type: "complements" },
    { source: "20", target: "19", strength: 0.7, type: "complements" },
    { source: "20", target: "21", strength: 0.8, type: "enables" },
    { source: "21", target: "5", strength: 0.6, type: "generates_data_for" },
    { source: "21", target: "20", strength: 0.8, type: "utilizes" },
    { source: "22", target: "7", strength: 0.8, type: "depends_on" },
    { source: "22", target: "13", strength: 0.8, type: "utilizes" },
    { source: "23", target: "13", strength: 0.9, type: "depends_on" },
    { source: "23", target: "22", strength: 0.7, type: "related_to" },
    { source: "24", target: "18", strength: 0.7, type: "built_on" },
    { source: "24", target: "10", strength: 0.6, type: "addresses" },
    { source: "25", target: "18", strength: 0.8, type: "protects" },
    { source: "25", target: "24", strength: 0.6, type: "enhances" },
    { source: "25", target: "10", strength: 0.7, type: "overlaps_with" },
    { source: "26", target: "22", strength: 0.7, type: "informs" },
    { source: "26", target: "23", strength: 0.7, type: "informs" },
    { source: "26", target: "10", strength: 0.6, type: "considers" },
    { source: "27", target: "1", strength: 0.7, type: "utilizes" },
    { source: "27", target: "5", strength: 0.8, type: "applies" },
    { source: "28", target: "5", strength: 0.7, type: "utilizes" },
    { source: "28", target: "21", strength: 0.8, type: "leverages" },
    { source: "29", target: "4", strength: 0.8, type: "applies" },
    { source: "29", target: "7", strength: 0.9, type: "relies_on" },
    { source: "29", target: "10", strength: 0.7, type: "raises_questions" },
    { source: "30", target: "6", strength: 0.9, type: "underlies" },
    { source: "30", target: "12", strength: 0.8, type: "informs" },
  ],
}
