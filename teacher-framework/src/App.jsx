import { useEffect, useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
import './App.css'

const buildSourceLink = (fileName) => `${import.meta.env.BASE_URL}sources/${encodeURIComponent(fileName)}`

const sourceLinks = {
  interadPaper: buildSourceLink('2577101.2577106.pdf'),
  limaTdic: buildSourceLink('ARTIGO_IVONALDO_PEREIRA_DE_LIMA.pdf'),
  collMonereo: buildSourceLink('COLL_MONEREO_Psicologia da Educação Virtual-páginas.pdf'),
  tangibleInterfaces: buildSourceLink('Interfaces_tangiveis_e_o_design_de_ambientes_educa.pdf'),
  tpack: buildSourceLink('Koehler_et_al_2013.pdf'),
  didactics: buildSourceLink('Livro Didatica.pdf'),
}

const uiText = {
  en: {
    kicker: 'Teacher Experience Studio',
    title: 'Instructional Design Framework',
    subtitle: 'A modern workspace to design, validate, and export technology-mediated lessons.',
    languageSwitch: {
      ariaLabel: 'Switch language between English and Portuguese (Brazil)',
      title: 'Switch language',
    },
    modes: {
      framework: 'Framework',
      apply: 'Apply',
      about: 'About us',
    },
    aboutSection: {
      title: 'The Team Behind This Framework',
      subtitle:
        'Meet the professionals responsible for designing and developing this instructional design framework.',
      readMore: 'Read more',
      readLess: 'Read less',
    },
    introTiles: [
      { label: '7 phases', value: 'Pedagogy-first structure' },
      { label: 'ABNT grounded', value: 'References + source links by phase' },
      { label: 'Export-ready', value: 'PDF output for planning documentation' },
    ],
    phase: 'Phase',
    previous: 'Previous',
    next: 'Next',
    of: 'of',
    navigation: {
      prevAria: (title) => `Go to previous phase: ${title}`,
      nextAria: (title) => `Go to next phase: ${title}`,
      mobileAria: 'Mobile framework navigation',
      phaseNavAria: 'Framework phase navigation',
      gotoPhaseAria: (index, title) => `Go to phase ${index}: ${title}`,
      gotoPrevPhaseAria: 'Go to previous phase',
      gotoNextPhaseAria: 'Go to next phase',
    },
    labels: {
      directedQuestion: 'Directed question',
      whatIs: 'What it is',
      objective: 'Objective',
      example: 'Helena example',
      checklist: 'Decisions / checklist',
      references: 'ABNT references',
      designProgress: 'Design progress',
      currentPhase: 'Current phase',
      loadDraft: 'Load Helena draft',
      reset: 'Reset',
      openPdfPreview: 'Open PDF preview',
      buildPhase: 'Define decisions for this phase',
      textareaPlaceholder: 'Write the decisions/checklist justification for this phase...',
      tip: 'Tip: explain the decisions you selected in the checklist and how they connect to learning evidence.',
      guidance: 'Guidance',
      completedPhase: 'Completed phase',
      pendingPhase: 'Pending phase',
      previousPhase: 'Previous phase',
      nextPhase: 'Next phase',
      phasesCompleted: (completed, total) => `${completed} of ${total} phases completed`,
    },
    pdf: {
      reportTitle: 'Instructional Design Framework Report',
      generatedOn: (date, time) => `Generated on ${date} at ${time}.`,
      macroQuestion: 'Macro question',
      directedQuestion: 'Directed question',
      teacherArchitecture: 'Teacher architecture',
      notFilled: 'Not filled yet.',
      checkedDecisions: 'Checked decisions',
      noChecklist: 'No checklist item selected.',
      references: 'ABNT references:',
      reference: (index) => `Reference ${index}`,
      sourceLink: 'Source link',
    },
  },
  port: {
    kicker: 'Estúdio de Experiência Docente',
    title: 'Framework de Design Instrucional',
    subtitle:
      'Um espaço moderno para desenhar, validar e exportar aulas mediadas por tecnologia.',
    languageSwitch: {
      ariaLabel: 'Trocar idioma entre Inglês e Português (Brasil)',
      title: 'Trocar idioma',
    },
    modes: {
      framework: 'Framework',
      apply: 'Aplicar',
      about: 'Sobre nós',
    },
    aboutSection: {
      title: 'Equipe Responsável por Este Framework',
      subtitle:
        'Conheça as profissionais responsáveis pela concepção e desenvolvimento deste framework de design instrucional.',
      readMore: 'Ler mais',
      readLess: 'Ler menos',
    },
    introTiles: [
      { label: '7 fases', value: 'Estrutura com foco na pedagogia' },
      { label: 'Base ABNT', value: 'Referências + links de fonte por fase' },
      { label: 'Pronto para exportar', value: 'Saída em PDF para documentação do plano' },
    ],
    phase: 'Fase',
    previous: 'Anterior',
    next: 'Próxima',
    of: 'de',
    navigation: {
      prevAria: (title) => `Ir para fase anterior: ${title}`,
      nextAria: (title) => `Ir para próxima fase: ${title}`,
      mobileAria: 'Navegação mobile do framework',
      phaseNavAria: 'Navegação das fases do framework',
      gotoPhaseAria: (index, title) => `Ir para fase ${index}: ${title}`,
      gotoPrevPhaseAria: 'Ir para fase anterior',
      gotoNextPhaseAria: 'Ir para próxima fase',
    },
    labels: {
      directedQuestion: 'Pergunta direcionadora',
      whatIs: 'O que é',
      objective: 'Objetivo',
      example: 'Exemplo Helena',
      checklist: 'Decisões / checklist',
      references: 'Referências ABNT',
      designProgress: 'Progresso do design',
      currentPhase: 'Fase atual',
      loadDraft: 'Carregar rascunho da Helena',
      reset: 'Resetar',
      openPdfPreview: 'Abrir prévia em PDF',
      buildPhase: 'Defina as decisões desta fase',
      textareaPlaceholder: 'Escreva a justificativa das decisões/checklist desta fase...',
      tip: 'Dica: explique as decisões marcadas no checklist e como elas se conectam às evidências de aprendizagem.',
      guidance: 'Orientações',
      completedPhase: 'Fase concluída',
      pendingPhase: 'Fase pendente',
      previousPhase: 'Fase anterior',
      nextPhase: 'Próxima fase',
      phasesCompleted: (completed, total) => `${completed} de ${total} fases concluídas`,
    },
    pdf: {
      reportTitle: 'Relatório do Framework de Design Instrucional',
      generatedOn: (date, time) => `Gerado em ${date} às ${time}.`,
      macroQuestion: 'Pergunta macro',
      directedQuestion: 'Pergunta direcionadora',
      teacherArchitecture: 'Arquitetura docente',
      notFilled: 'Ainda não preenchido.',
      checkedDecisions: 'Decisões marcadas',
      noChecklist: 'Nenhum item do checklist selecionado.',
      references: 'Referências ABNT:',
      reference: (index) => `Referência ${index}`,
      sourceLink: 'Link da fonte',
    },
  },
}

const phasesByLanguage = {
  en: [
  {
    id: 'learning-objectives',
    title: 'Learning Objectives',
    macroQuestion: 'What should students learn?',
    directedQuestion:
      'What do students need to learn, develop, or demonstrate by the end of this technology-mediated activity?',
    whatIs:
      'Define the pedagogical intention before selecting any tool. Clarify concepts, skills, competencies, and learning evidence first.',
    objective:
      'Ensure the activity starts from learning goals and aligns content, pedagogy, and technology with coherence.',
    example:
      'Students design a digital framework that connects goals, strategies, resources, interactions, assessment, and accessibility decisions in a coherent instructional design.',
    checklist: [
      'Define core content.',
      'Define expected learning outcomes.',
      'List the skills students should develop.',
      'Define evidence of learning.',
      'Confirm if collaboration/creation/problem-solving is required.',
      'Justify if technology extends learning instead of only replacing traditional practice.',
    ],
    references: [
      {
        abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
        link: sourceLinks.tpack,
        label: 'Open source (Koehler et al., 2013)',
      },
      {
        abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
        link: sourceLinks.didactics,
        label: 'Open source (Didactics book)',
      },
    ],
  },
  {
    id: 'student-profile',
    title: 'Student Profile and Context',
    macroQuestion: 'Who are you teaching?',
    directedQuestion:
      'Who are your students, what prior repertoire do they have, and what real conditions shape participation?',
    whatIs:
      'Diagnose prior knowledge, digital familiarity, access conditions, participation patterns, and inclusion requirements.',
    objective:
      'Design a feasible and contextualized activity for real students, not for an idealized group.',
    example:
      'A face-to-face class with mixed digital fluency. Most students can use phones and laptops, but need clear role division, onboarding time, and guided teacher mediation.',
    checklist: [
      'Describe students and their context.',
      'Map prior knowledge about content and digital tools.',
      'Check device and connectivity conditions.',
      'Identify accessibility requirements.',
      'Estimate autonomy level for this group.',
      'Define teacher mediation needed during the activity.',
    ],
    references: [
      {
        abnt: 'COLL, César; MONEREO, Carles (org.). Psicologia da educação virtual: aprender e ensinar com as tecnologias da informação e da comunicação. Porto Alegre: Artmed, 2010.',
        link: sourceLinks.collMonereo,
        label: 'Open source (Coll & Monereo)',
      },
      {
        abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
        link: sourceLinks.limaTdic,
        label: 'Open source (Lima, 2016)',
      },
    ],
  },
  {
    id: 'technology-choice',
    title: 'Technology Choice',
    macroQuestion: 'What will you teach with?',
    directedQuestion:
      'Which technology will be used, and why is it pedagogically appropriate for your goals and student profile?',
    whatIs:
      'Select digital tools based on educational value, not novelty. The tool must support learning actions, not distract from them.',
    objective:
      'Choose a tool that supports participation, collaboration, authorship, feedback, and instructional viability.',
    example:
      'Use Miro, Padlet, or collaborative Canva so groups can co-construct a visual framework, comment in real time, and iterate with teacher feedback.',
    checklist: [
      'Name the primary tool.',
      'State pedagogical function of the tool.',
      'Verify collaboration and authorship affordances.',
      'Check mobile viability and complexity for available time.',
      'Check data/privacy requirements (accounts, permissions).',
      'Define a fallback tool if the primary one fails.',
    ],
    references: [
      {
        abnt: 'HAYASHI, Elaine C. S.; BARANAUSKAS, M. Cecília C. Affectibility and design workshops: taking actions towards more sensible design. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 2013, Manaus. Proceedings [...]. 2013.',
        link: sourceLinks.interadPaper,
        label: 'Open source (Affectibility paper)',
      },
      {
        abnt: 'GUTIÉRREZ POSADA, Julián Esteban. Interfaces tangíveis e o design de ambientes educacionais para co-construção de narrativas. Tecnologias, Sociedade e Conhecimento, Campinas, v. 3, n. 1, p. 104-107, 2015.',
        link: sourceLinks.tangibleInterfaces,
        label: 'Open source (Posada, 2015)',
      },
    ],
  },
  {
    id: 'activity-sequence',
    title: 'Activity Sequence',
    macroQuestion: 'How will you teach?',
    directedQuestion:
      'What sequence of steps, time blocks, actions, and interactions structures the activity from start to end?',
    whatIs:
      'Organize the learning flow across before/during/after moments, with clear student actions, teacher mediation, and expected deliverables.',
    objective:
      'Transform learning goals into a clear and executable pathway that avoids improvisation and preserves coherence.',
    example:
      'Before class, students read sources. In class, they analyze the PBL problem and complete each framework phase in groups. After sharing, they revise using peer and teacher feedback.',
    checklist: [
      'Define what students do before class.',
      'Define opening prompt and challenge.',
      'Define group composition and roles.',
      'Set time blocks for each phase.',
      'Define teacher mediation checkpoints.',
      'Define presentation and revision steps.',
    ],
    references: [
      {
        abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
        link: sourceLinks.didactics,
        label: 'Open source (Didactics book)',
      },
      {
        abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
        link: sourceLinks.tpack,
        label: 'Open source (TPACK framework)',
      },
    ],
  },
  {
    id: 'assessment-feedback',
    title: 'Assessment and Feedback',
    macroQuestion: 'What are the learning evidences?',
    directedQuestion:
      'How will learning be monitored during the process, and which feedback loops will help students improve?',
    whatIs:
      'Define criteria, instruments, and feedback cycles that evaluate process and product, including revision opportunities.',
    objective:
      'Use assessment as formative guidance, not only a final score.',
    example:
      'Groups submit one visual framework. A rubric evaluates coherence, clarity, grounding in references, accessibility planning, and risk mitigation. Peer and teacher feedback lead to revision.',
    checklist: [
      'Define final evidence/product.',
      'Define criteria linked to objectives.',
      'Include process and product indicators.',
      'Plan peer feedback and teacher feedback.',
      'Allow revision after feedback.',
      'Use a concise rubric.',
    ],
    references: [
      {
        abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
        link: sourceLinks.didactics,
        label: 'Open source (Didactics assessment chapter)',
      },
      {
        abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
        link: sourceLinks.limaTdic,
        label: 'Open source (Lima, 2016)',
      },
    ],
  },
  {
    id: 'accessibility-engagement',
    title: 'Accessibility, Engagement, and Cognitive Load',
    macroQuestion: 'How is the activity accessible and engaging?',
    directedQuestion:
      'Does the activity enable real participation without technical, visual, communication, or cognitive barriers?',
    whatIs:
      'Review inclusion and usability conditions: readability, clear instructions, tool overload prevention, and alternatives for participation.',
    objective:
      'Prevent technology from becoming a barrier and improve meaningful engagement.',
    example:
      'Use one primary tool, clear multi-step instructions, high contrast, and alternatives (text/audio/role-based contribution) for students with access constraints.',
    checklist: [
      'Check clarity of instructions and language.',
      'Check visual readability and contrast.',
      'Limit number of tools in one activity.',
      'Include onboarding example/template.',
      'Provide alternative participation paths.',
      'Ensure the task requires active creation or reflection.',
    ],
    references: [
      {
        abnt: 'COLL, César; MONEREO, Carles (org.). Psicologia da educação virtual: aprender e ensinar com as tecnologias da informação e da comunicação. Porto Alegre: Artmed, 2010.',
        link: sourceLinks.collMonereo,
        label: 'Open source (Virtual education psychology)',
      },
      {
        abnt: 'GUTIÉRREZ POSADA, Julián Esteban. Interfaces tangíveis e o design de ambientes educacionais para co-construção de narrativas. Tecnologias, Sociedade e Conhecimento, Campinas, v. 3, n. 1, p. 104-107, 2015.',
        link: sourceLinks.tangibleInterfaces,
        label: 'Open source (Tangible interfaces)',
      },
    ],
  },
  {
    id: 'risks-alternatives',
    title: 'Limitations, Risks, and Alternatives',
    macroQuestion: 'What can go wrong?',
    directedQuestion:
      'Which technical, pedagogical, and organizational risks can compromise the activity, and what alternatives are ready?',
    whatIs:
      'Anticipate failure points and define fallback plans before implementation.',
    objective:
      'Increase resilience and prevent dependence on ideal conditions.',
    example:
      'If the primary platform fails, switch to Slides/docs. If participation is unequal, assign rotating roles. If outcomes are superficial, require explicit pedagogical justification in each phase.',
    checklist: [
      'List technical risks and mitigations.',
      'List pedagogical risks and mitigations.',
      'List participation and equity risks.',
      'Define fallback workflow and responsible roles.',
      'Define post-feedback adjustment actions.',
      'Check time risk and overload risk.',
    ],
    references: [
      {
        abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
        link: sourceLinks.limaTdic,
        label: 'Open source (Limits and possibilities of TDIC)',
      },
      {
        abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
        link: sourceLinks.tpack,
        label: 'Open source (TPACK and context)',
      },
    ],
  },
  ],
  port: [
    {
      id: 'learning-objectives',
      title: 'Objetivos de Aprendizagem',
      macroQuestion: 'O que os estudantes devem aprender?',
      directedQuestion:
        'O que os estudantes precisam aprender, desenvolver ou demonstrar ao final desta atividade mediada por tecnologia?',
      whatIs:
        'Defina a intenção pedagógica antes de escolher qualquer ferramenta. Esclareça primeiro conceitos, habilidades, competências e evidências de aprendizagem.',
      objective:
        'Garantir que a atividade parta dos objetivos de aprendizagem e alinhe conteúdo, pedagogia e tecnologia com coerência.',
      example:
        'Estudantes desenham um framework digital que conecta objetivos, estratégias, recursos, interações, avaliação e acessibilidade em um design instrucional coerente.',
      checklist: [
        'Definir o conteúdo central.',
        'Definir os resultados de aprendizagem esperados.',
        'Listar as habilidades que os estudantes devem desenvolver.',
        'Definir evidências de aprendizagem.',
        'Confirmar se colaboração/criação/resolução de problemas é necessária.',
        'Justificar se a tecnologia amplia a aprendizagem em vez de apenas substituir práticas tradicionais.',
      ],
      references: [
        {
          abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
          link: sourceLinks.tpack,
          label: 'Abrir fonte (Koehler et al., 2013)',
        },
        {
          abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
          link: sourceLinks.didactics,
          label: 'Abrir fonte (Livro de Didática)',
        },
      ],
    },
    {
      id: 'student-profile',
      title: 'Perfil dos Estudantes e Contexto',
      macroQuestion: 'Para quem você está ensinando?',
      directedQuestion:
        'Quem são seus estudantes, qual repertório prévio possuem e quais condições reais moldam sua participação?',
      whatIs:
        'Diagnostique conhecimentos prévios, familiaridade digital, condições de acesso, padrões de participação e necessidades de inclusão.',
      objective:
        'Projetar uma atividade viável e contextualizada para estudantes reais, não para um grupo idealizado.',
      example:
        'Turma presencial com fluência digital mista. A maioria usa celular e notebook, mas precisa de divisão clara de papéis, tempo de ambientação e mediação docente guiada.',
      checklist: [
        'Descrever os estudantes e seu contexto.',
        'Mapear conhecimentos prévios sobre conteúdo e ferramentas digitais.',
        'Verificar condições de dispositivos e conectividade.',
        'Identificar requisitos de acessibilidade.',
        'Estimar nível de autonomia deste grupo.',
        'Definir mediação docente necessária durante a atividade.',
      ],
      references: [
        {
          abnt: 'COLL, César; MONEREO, Carles (org.). Psicologia da educação virtual: aprender e ensinar com as tecnologias da informação e da comunicação. Porto Alegre: Artmed, 2010.',
          link: sourceLinks.collMonereo,
          label: 'Abrir fonte (Coll & Monereo)',
        },
        {
          abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
          link: sourceLinks.limaTdic,
          label: 'Abrir fonte (Lima, 2016)',
        },
      ],
    },
    {
      id: 'technology-choice',
      title: 'Escolha da Tecnologia',
      macroQuestion: 'Com o que você vai ensinar?',
      directedQuestion:
        'Qual tecnologia será usada e por que ela é pedagogicamente adequada aos seus objetivos e ao perfil dos estudantes?',
      whatIs:
        'Selecione ferramentas digitais com base no valor educacional, não na novidade. A ferramenta precisa apoiar ações de aprendizagem, não distrair.',
      objective:
        'Escolher uma ferramenta que apoie participação, colaboração, autoria, feedback e viabilidade instrucional.',
      example:
        'Usar Miro, Padlet ou Canva colaborativo para que grupos coconstruam um framework visual, comentem em tempo real e iterem com feedback docente.',
      checklist: [
        'Nomear a ferramenta principal.',
        'Declarar a função pedagógica da ferramenta.',
        'Verificar possibilidades de colaboração e autoria.',
        'Checar viabilidade mobile e complexidade para o tempo disponível.',
        'Checar requisitos de dados/privacidade (contas, permissões).',
        'Definir ferramenta alternativa se a principal falhar.',
      ],
      references: [
        {
          abnt: 'HAYASHI, Elaine C. S.; BARANAUSKAS, M. Cecília C. Affectibility and design workshops: taking actions towards more sensible design. In: BRAZILIAN SYMPOSIUM ON HUMAN FACTORS IN COMPUTING SYSTEMS, 2013, Manaus. Proceedings [...]. 2013.',
          link: sourceLinks.interadPaper,
          label: 'Abrir fonte (Artigo Affectibility)',
        },
        {
          abnt: 'GUTIÉRREZ POSADA, Julián Esteban. Interfaces tangíveis e o design de ambientes educacionais para co-construção de narrativas. Tecnologias, Sociedade e Conhecimento, Campinas, v. 3, n. 1, p. 104-107, 2015.',
          link: sourceLinks.tangibleInterfaces,
          label: 'Abrir fonte (Posada, 2015)',
        },
      ],
    },
    {
      id: 'activity-sequence',
      title: 'Sequência da Atividade',
      macroQuestion: 'Como você vai ensinar?',
      directedQuestion:
        'Qual sequência de passos, tempos, ações e interações estrutura a atividade do início ao fim?',
      whatIs:
        'Organize o fluxo de aprendizagem em momentos antes/durante/depois, com ações claras dos estudantes, mediação docente e entregáveis esperados.',
      objective:
        'Transformar os objetivos de aprendizagem em um percurso claro e executável, evitando improvisação e mantendo coerência.',
      example:
        'Antes da aula, estudantes leem as fontes. Em aula, analisam o problema de ABP e completam cada fase do framework em grupos. Após socialização, revisam com feedback dos pares e da docente.',
      checklist: [
        'Definir o que os estudantes fazem antes da aula.',
        'Definir disparador inicial e desafio.',
        'Definir composição dos grupos e papéis.',
        'Definir blocos de tempo para cada fase.',
        'Definir checkpoints de mediação docente.',
        'Definir etapas de apresentação e revisão.',
      ],
      references: [
        {
          abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
          link: sourceLinks.didactics,
          label: 'Abrir fonte (Livro de Didática)',
        },
        {
          abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
          link: sourceLinks.tpack,
          label: 'Abrir fonte (Framework TPACK)',
        },
      ],
    },
    {
      id: 'assessment-feedback',
      title: 'Avaliação e Feedback',
      macroQuestion: 'Quais são as evidências de aprendizagem?',
      directedQuestion:
        'Como a aprendizagem será acompanhada durante o processo e quais ciclos de feedback ajudarão os estudantes a melhorar?',
      whatIs:
        'Defina critérios, instrumentos e ciclos de feedback que avaliem processo e produto, incluindo oportunidades de revisão.',
      objective:
        'Usar a avaliação como orientação formativa, e não apenas como pontuação final.',
      example:
        'Os grupos entregam um framework visual. Uma rubrica avalia coerência, clareza, fundamentação em referências, planejamento de acessibilidade e mitigação de riscos. Feedback de pares e docente gera revisão.',
      checklist: [
        'Definir evidência/produto final.',
        'Definir critérios vinculados aos objetivos.',
        'Incluir indicadores de processo e produto.',
        'Planejar feedback de pares e da docente.',
        'Permitir revisão após feedback.',
        'Usar rubrica concisa.',
      ],
      references: [
        {
          abnt: 'RÊGO, Luciane Borges do; LIMA, Maria Vitória Ribas de Oliveira. Didática. Recife: UPE, 2010.',
          link: sourceLinks.didactics,
          label: 'Abrir fonte (Capítulo de avaliação em Didática)',
        },
        {
          abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
          link: sourceLinks.limaTdic,
          label: 'Abrir fonte (Lima, 2016)',
        },
      ],
    },
    {
      id: 'accessibility-engagement',
      title: 'Acessibilidade, Engajamento e Carga Cognitiva',
      macroQuestion: 'Como a atividade é acessível e engajadora?',
      directedQuestion:
        'A atividade permite participação real sem barreiras técnicas, visuais, de comunicação ou cognitivas?',
      whatIs:
        'Revise condições de inclusão e usabilidade: legibilidade, instruções claras, prevenção de sobrecarga de ferramentas e alternativas de participação.',
      objective:
        'Evitar que a tecnologia vire barreira e aumentar o engajamento significativo.',
      example:
        'Usar uma ferramenta principal, instruções claras em etapas, alto contraste e alternativas (texto/áudio/contribuição por papéis) para estudantes com restrições de acesso.',
      checklist: [
        'Verificar clareza das instruções e da linguagem.',
        'Verificar legibilidade visual e contraste.',
        'Limitar a quantidade de ferramentas na mesma atividade.',
        'Incluir exemplo/template de ambientação.',
        'Oferecer caminhos alternativos de participação.',
        'Garantir que a tarefa exija criação ativa ou reflexão.',
      ],
      references: [
        {
          abnt: 'COLL, César; MONEREO, Carles (org.). Psicologia da educação virtual: aprender e ensinar com as tecnologias da informação e da comunicação. Porto Alegre: Artmed, 2010.',
          link: sourceLinks.collMonereo,
          label: 'Abrir fonte (Psicologia da educação virtual)',
        },
        {
          abnt: 'GUTIÉRREZ POSADA, Julián Esteban. Interfaces tangíveis e o design de ambientes educacionais para co-construção de narrativas. Tecnologias, Sociedade e Conhecimento, Campinas, v. 3, n. 1, p. 104-107, 2015.',
          link: sourceLinks.tangibleInterfaces,
          label: 'Abrir fonte (Interfaces tangíveis)',
        },
      ],
    },
    {
      id: 'risks-alternatives',
      title: 'Limitações, Riscos e Alternativas',
      macroQuestion: 'O que pode dar errado?',
      directedQuestion:
        'Quais riscos técnicos, pedagógicos e organizacionais podem comprometer a atividade e quais alternativas estão prontas?',
      whatIs:
        'Antecipe pontos de falha e defina planos de contingência antes da implementação.',
      objective: 'Aumentar a resiliência e evitar dependência de condições ideais.',
      example:
        'Se a plataforma principal cair, migrar para Slides/docs. Se a participação for desigual, atribuir papéis rotativos. Se os resultados forem superficiais, exigir justificativa pedagógica explícita em cada fase.',
      checklist: [
        'Listar riscos técnicos e suas mitigação.',
        'Listar riscos pedagógicos e suas mitigação.',
        'Listar riscos de participação e equidade.',
        'Definir fluxo alternativo e responsáveis.',
        'Definir ações de ajuste pós-feedback.',
        'Verificar risco de tempo e sobrecarga.',
      ],
      references: [
        {
          abnt: 'LIMA, Ivonaldo Pereira de. Prática docente com uso das tecnologias digitais da informação e comunicação: possibilidades e limites. Arapiraca: UFAL, 2016.',
          link: sourceLinks.limaTdic,
          label: 'Abrir fonte (Limites e possibilidades das TDIC)',
        },
        {
          abnt: 'KOEHLER, Matthew J.; MISHRA, Punya; AKCAOGLU, Mete; ROSENBERG, Joshua M. The technological pedagogical content knowledge framework for teachers and teacher educators. Commonwealth Educational Media Centre for Asia, 2013.',
          link: sourceLinks.tpack,
          label: 'Abrir fonte (TPACK e contexto)',
        },
      ],
    },
  ],
}

const phaseIds = phasesByLanguage.en.map((phase) => phase.id)
const defaultApplyData = phaseIds.reduce((acc, phaseId) => {
  acc[phaseId] = {
    plan: '',
    selectedChecklist: [],
  }
  return acc
}, {})

const teamByLanguage = {
  en: [
    {
      name: 'Rute Cintra',
      photo: `${import.meta.env.BASE_URL}photos/rute-cintra.jpg`,
      description:
        'Researcher and developer with interdisciplinary work in Education and Educational Technology. Master candidate in Education at the Federal University of Alagoas (UFAL). Holds a degree in Pedagogy from UFAL, with previous experience in Computer Science. Works in research, development, and extension projects focused on educational inclusion, pedagogical innovation, and the integration of digital technologies in teaching, with emphasis on Computational Thinking and interdisciplinary unplugged computing.',
    },
    {
      name: 'Mayara Rios',
      photo: `${import.meta.env.BASE_URL}photos/mayara-rios.jpeg`,
      description:
        'Administrative Analyst at Hospital Universitario Professor Alberto Antunes (HUPAA) and PhD candidate in Teaching at UFAL. Holds a Master degree in Public Administration and an MBA in Business Management from FGV. With dual undergraduate degrees in Administration and Tourism, she also has international certification in Hospitality Management from UCF (Florida, USA) and experience in three Disney programs.',
    },
    {
      name: 'Adriana Albuquerque',
      photo: `${import.meta.env.BASE_URL}photos/adriana-albuquerque.jpeg`,
      description:
        'Psychologist and neuropsychologist with 20 years of clinical practice, including 14 years at Clinica Reprocessamente/Espaco Psicoterapico, where she is also the Technical Lead. She works with Gestalt Therapy and EMDR Therapy. She is a professor with a master degree at UNCISAL, graduated from UFAL, holds a master degree in Health Education (SUS Context) from FAMED/UFAL, and is currently a PhD candidate in Teaching at RENOEN (UFAL campus).',
    },
    {
      name: 'Amanda Marques',
      photo: `${import.meta.env.BASE_URL}photos/amanda-marques.jpeg`,
      description:
        'Professor, Psychopedagogue, and Educational Consultant with strong academic training and professional experience in Early Childhood Education, Elementary Education, pedagogical guidance, psychopedagogy, teacher education, and higher education. She is a PhD candidate in Teaching at RENOEN/UFAL and holds a Master degree in Science and Mathematics Teaching, with specializations in Inclusive Education and Active Methodologies. She has extensive experience in planning, developing, and delivering teaching activities, as well as academic advising for research projects, internship reports, scientific papers, and academic writing aligned with scientific methodology and ABNT standards. She works in initial and continuing education for students and education professionals, connecting theory, pedagogical practice, and didactic-methodological innovation. She also contributes to educational projects, training development, technical reporting, and interdisciplinary collaboration with pedagogical teams and managers, supporting improvements in teaching, research, and university extension.',
    },
    {
      name: 'Maria Luisa Martins da Silva',
      photo: `${import.meta.env.BASE_URL}photos/maria-luisa.jpeg`,
      description:
        'Holds a Pedagogy degree from the Federal University of Alagoas (UFAL), advanced English proficiency, and experience in Education. She participated in UFAL programs such as PIBID (2018-2020), focused on literacy in early Elementary School, and Pedagogical Residency (2020-2022), focused on literacy in Early Childhood Education. She is currently an English teacher in a private school network in Maceio, Alagoas, a member of the Reflective and Digital Narratives research group at UFAL, a specialist in Educational Management (UFAL), a Master candidate in Education at PPGE/UFAL, and an undergraduate student in Distance English Language and Literature at UFAL.',
    },
    {
      name: 'Larissa Alves',
      photo: `${import.meta.env.BASE_URL}photos/larissa-alves.jpeg`,
      description:
        'Holds a Pedagogy degree from the Federal University of Alagoas and is a Master candidate in Education at PPGE (CEDU/UFAL), with research focused on literacy. She also works as a teacher educator in Literacy and Special Education and is a member of the Teaching, Text and Creation (ETC) research group and the School Manuscript Laboratory (LAME/UFAL).',
    },
  ],
  port: [
    {
      name: 'Rute Cintra',
      photo: `${import.meta.env.BASE_URL}photos/rute-cintra.jpg`,
      description:
        'Pesquisadora e desenvolvedora com atuacao interdisciplinar nas areas de Educacao e Tecnologia Educacional. Mestranda pelo Programa de Pos-Graduacao em Educacao da Universidade Federal de Alagoas (UFAL). Graduada em Pedagogia pela UFAL, com experiencia previa em Ciencia da Computacao. Atua em projetos de pesquisa, desenvolvimento e extensao voltados a inclusao educacional, inovacao pedagogica e integracao de tecnologias digitais no ensino, com enfase em Pensamento Computacional e Computacao Desplugada Interdisciplinar.',
    },
    {
      name: 'Mayara Rios',
      photo: `${import.meta.env.BASE_URL}photos/mayara-rios.jpeg`,
      description:
        'Analista Administrativa no Hospital Universitario Professor Alberto Antunes (HUPAA) e doutoranda em Ensino pela UFAL. Mestre em Administracao Publica e MBA em Gestao Empresarial pela FGV. Com dupla graduacao em Administracao e Turismo, possui certificacao internacional em Gestao de Hospitalidade pela UCF (Florida-EUA) e vivencia em tres programas da Disney.',
    },
    {
      name: 'Adriana Albuquerque',
      photo: `${import.meta.env.BASE_URL}photos/adriana-albuquerque.jpeg`,
      description:
        'Psicologa e neuropsicologa, atua na area clinica ha 20 anos, sendo 14 deles na Clinica Reprocessamente/Espaco Psicoterapico, onde tambem e Responsavel Tecnica. Trabalha com duas abordagens: Gestalt-Terapia e Terapia EMDR. Professora mestra da Universidade Estadual de Ciencias da Saude de Alagoas (UNCISAL), graduada pela UFAL, com mestrado em Ensino na Saude - Contexto SUS pela FAMED/UFAL, e doutoranda em Ensino no Programa de Pos-Graduacao da Rede Nordeste de Ensino (RENOEN), polo UFAL.',
    },
    {
      name: 'Amanda Marques',
      photo: `${import.meta.env.BASE_URL}photos/amanda-marques.jpeg`,
      description:
        'Sou Professora, Psicopedagoga e Consultora Educacional, com solida formacao e experiencia nas areas de Educacao Infantil, Anos Iniciais, orientacao pedagogica, psicopedagogia, formacao docente e ensino superior. Sou Doutoranda pelo Programa de Pos-Graduacao em Ensino (RENOEN) da Universidade Federal de Alagoas (UFAL) e Mestre em Ensino de Ciencias e Matematica, com especializacoes em Educacao Inclusiva e Metodologias Ativas. Possuo experiencia no planejamento, desenvolvimento e execucao de atividades de ensino, bem como na orientacao academica para elaboracao de projetos de pesquisa, relatorios de estagio, artigos cientificos e demais producoes academicas, com dominio da metodologia cientifica e das normas da ABNT. Atuo na formacao inicial e continuada de estudantes e profissionais da educacao, articulando fundamentos teoricos, praticas pedagogicas e inovacao didatico-metodologica. Apresento tambem experiencia em projetos educacionais, desenvolvimento de treinamentos, elaboracao de relatorios tecnicos e atuacao interdisciplinar com equipes pedagogicas e gestores, contribuindo para a qualificacao do ensino, da pesquisa e da extensao universitaria.',
    },
    {
      name: 'Maria Luisa Martins da Silva',
      photo: `${import.meta.env.BASE_URL}photos/maria-luisa.jpeg`,
      description:
        'Graduada em Pedagogia pela Universidade Federal de Alagoas. Nivel avancado de Ingles. Participou do Programa Institucional de Bolsa de Iniciacao a Docencia (PIBID) da Universidade Federal de Alagoas (UFAL) com o subprojeto de Pedagogia intitulado: Alfabetizacao e letramento na primeira etapa do Ensino Fundamental (2018 ate 2020). Participou do Programa Residencia Pedagogica (PRP) da Universidade Federal de Alagoas (UFAL) com o subprojeto de Pedagogia intitulado: Alfabetizacao e letramento na Educacao Infantil (2020 ate 2022). Tem experiencia na area de Educacao. Atualmente e Professora de Ingles da rede privada em Maceio-Alagoas. Integrante do grupo de pesquisa Narrativas Reflexivas e Digitais pela Universidade Federal de Alagoas. Especialista em Gestao Educacional pela Universidade Federal de Alagoas. Mestranda em Educacao pelo Programa de Pos-Graduacao em Educacao (PPGE) - UFAL. Graduanda em Letras-Ingles a distancia pela Universidade Federal de Alagoas.',
    },
    {
      name: 'Larissa Alves',
      photo: `${import.meta.env.BASE_URL}photos/larissa-alves.jpeg`,
      description:
        'Graduada em Pedagogia pela Universidade Federal de Alagoas. Mestranda em Educacao pelo Programa de Pos-Graduacao em Educacao (CEDU/UFAL), com pesquisas voltadas para o campo de Alfabetizacao, e formadora docente nas areas de Alfabetizacao e Educacao Especial. Membro do grupo de pesquisa Ensino, Texto & Criacao (ETC) e do Laboratorio do Manuscrito Escolar (LAME/UFAL).',
    },
  ],
}

function App() {
  const [mode, setMode] = useState('framework')
  const [language, setLanguage] = useState('en')
  const [applyData, setApplyData] = useState(defaultApplyData)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [frameworkPhaseIndex, setFrameworkPhaseIndex] = useState(0)
  const [expandedProfiles, setExpandedProfiles] = useState({})
  const texts = uiText[language]
  const phases = phasesByLanguage[language]
  const teamMembers = teamByLanguage[language]

  const completion = useMemo(() => {
    const completed = phases.filter((phase) => applyData[phase.id].plan.trim().length > 0).length
    const total = phases.length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }, [applyData, phases])

  const updatePlan = (phaseId, value) => {
    setApplyData((current) => ({
      ...current,
      [phaseId]: {
        ...current[phaseId],
        plan: value,
      },
    }))
  }

  const toggleChecklist = (phaseId, itemIndex) => {
    setApplyData((current) => {
      const selected = current[phaseId].selectedChecklist
      const nextSelected = selected.includes(itemIndex)
        ? selected.filter((entry) => entry !== itemIndex)
        : [...selected, itemIndex]

      return {
        ...current,
        [phaseId]: {
          ...current[phaseId],
          selectedChecklist: nextSelected,
        },
      }
    })
  }

  const loadExamples = () => {
    setApplyData(
      phases.reduce((acc, phase) => {
        acc[phase.id] = {
          plan: phase.example,
          selectedChecklist: phase.checklist.map((_, index) => index),
        }
        return acc
      }, {}),
    )
  }

  const clearApply = () => {
    setApplyData(defaultApplyData)
    setCurrentPhaseIndex(0)
  }

  const currentPhase = phases[currentPhaseIndex]
  const currentPhaseApply = applyData[currentPhase.id]
  const phaseIsCompleted = (phaseId) => applyData[phaseId].plan.trim().length > 0

  const goToNextPhase = () => {
    setCurrentPhaseIndex((current) => Math.min(current + 1, phases.length - 1))
  }

  const goToPreviousPhase = () => {
    setCurrentPhaseIndex((current) => Math.max(current - 1, 0))
  }

  const goFrameworkLeft = () => {
    setFrameworkPhaseIndex((current) => (current - 1 + phases.length) % phases.length)
  }

  const goFrameworkRight = () => {
    setFrameworkPhaseIndex((current) => (current + 1) % phases.length)
  }

  const goToFrameworkPhase = (index) => {
    setFrameworkPhaseIndex(index)
  }

  const toggleProfileDescription = (memberName) => {
    setExpandedProfiles((current) => ({
      ...current,
      [memberName]: !current[memberName],
    }))
  }

  const getMemberInitials = (fullName) =>
    fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart[0]?.toUpperCase() || '')
      .join('')

  useEffect(() => {
    document.documentElement.lang = language === 'port' ? 'pt-BR' : 'en'
  }, [language])

  useEffect(() => {
    if (mode !== 'framework') {
      return undefined
    }

    const handleKeydown = (event) => {
      if (event.key === 'ArrowLeft') {
        setFrameworkPhaseIndex((current) => (current - 1 + phases.length) % phases.length)
      }

      if (event.key === 'ArrowRight') {
        setFrameworkPhaseIndex((current) => (current + 1) % phases.length)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [mode, phases.length])

  const frameworkCurrent = phases[frameworkPhaseIndex]
  const frameworkPrevIndex = (frameworkPhaseIndex - 1 + phases.length) % phases.length
  const frameworkNextIndex = (frameworkPhaseIndex + 1) % phases.length
  const frameworkPrev = phases[frameworkPrevIndex]
  const frameworkNext = phases[frameworkNextIndex]

  const openPdfPreview = () => {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const marginX = 60
    const maxWidth = pageWidth - marginX * 2
    const bottomMargin = 56
    let cursorY = 64

    const ensurePageSpace = (neededHeight = 24) => {
      if (cursorY + neededHeight > pageHeight - bottomMargin) {
        doc.addPage()
        cursorY = 64
      }
    }

    const writeLine = (text, options = {}) => {
      const { fontSize = 12, bold = false, gapAfter = 12, lineHeight = fontSize + 6 } = options
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.setFontSize(fontSize)
      const lines = doc.splitTextToSize(text, maxWidth)
      const estimatedHeight = lines.length * lineHeight
      ensurePageSpace(estimatedHeight + gapAfter)
      doc.text(lines, marginX, cursorY)
      cursorY += estimatedHeight + gapAfter
    }

    const drawSeparator = (gapBefore = 12, gapAfter = 22) => {
      ensurePageSpace(gapBefore + gapAfter + 8)
      cursorY += gapBefore
      doc.setDrawColor(203, 213, 225)
      doc.setLineWidth(0.8)
      doc.line(marginX, cursorY, pageWidth - marginX, cursorY)
      cursorY += gapAfter
    }

    writeLine(texts.pdf.reportTitle, { fontSize: 18, bold: true, gapAfter: 12 })
    writeLine(
      texts.pdf.generatedOn(
        new Date().toLocaleDateString(language === 'port' ? 'pt-BR' : 'en-US'),
        new Date().toLocaleTimeString(language === 'port' ? 'pt-BR' : 'en-US'),
      ),
      { fontSize: 11, gapAfter: 22, lineHeight: 18 },
    )
    drawSeparator(0, 28)

    phases.forEach((phase, index) => {
      writeLine(`${texts.phase} ${index + 1}: ${phase.title}`, { fontSize: 15, bold: true, gapAfter: 12 })
      writeLine(`${texts.pdf.macroQuestion}: ${phase.macroQuestion}`, { fontSize: 12, gapAfter: 10 })
      writeLine(`${texts.pdf.directedQuestion}: ${phase.directedQuestion}`, { fontSize: 12, gapAfter: 12 })
      writeLine(
        `${texts.pdf.teacherArchitecture}: ${
          applyData[phase.id].plan.trim() || texts.pdf.notFilled
        }`,
        { fontSize: 12, gapAfter: 12 },
      )

      const checklistText =
        applyData[phase.id].selectedChecklist.length > 0
          ? applyData[phase.id].selectedChecklist.map((itemIndex) => phase.checklist[itemIndex]).join(' | ')
          : texts.pdf.noChecklist
      writeLine(`${texts.pdf.checkedDecisions}: ${checklistText}`, { fontSize: 12, gapAfter: 12 })

      writeLine(texts.pdf.references, { fontSize: 10, bold: true, gapAfter: 5, lineHeight: 15 })
      phase.references.forEach((reference, referenceIndex) => {
        writeLine(`${texts.pdf.reference(referenceIndex + 1)}: ${reference.abnt}`, {
          fontSize: 11,
          gapAfter: 2,
          lineHeight: 17,
        })
        writeLine(`${texts.pdf.sourceLink}: ${reference.link}`, { fontSize: 11, gapAfter: 2, lineHeight: 17 })
      })
      drawSeparator(6, 24)
    })

    const blobUrl = doc.output('bloburl')
    window.open(blobUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-1" aria-hidden="true" />
      <div className="ambient ambient-2" aria-hidden="true" />

      <header className="topbar">
        <div>
          <p className="kicker">{texts.kicker}</p>
          <h1>{texts.title}</h1>
          <p className="subtitle">{texts.subtitle}</p>
        </div>
        <div className="topbar-controls">
          <button
            type="button"
            className={`language-switch ${language === 'port' ? 'port' : 'en'}`}
            onClick={() => setLanguage((current) => (current === 'en' ? 'port' : 'en'))}
            aria-label={texts.languageSwitch.ariaLabel}
            title={texts.languageSwitch.title}
          >
            <span className={`flag ${language === 'en' ? 'active' : ''}`} aria-hidden="true">
              🇺🇸
            </span>
            <span className={`flag ${language === 'port' ? 'active' : ''}`} aria-hidden="true">
              🇧🇷
            </span>
            <span className="switch-thumb" aria-hidden="true" />
          </button>
          <div className="mode-picker">
            <button
              type="button"
              className={mode === 'framework' ? 'active' : ''}
              onClick={() => setMode('framework')}
            >
              {texts.modes.framework}
            </button>
            <button
              type="button"
              className={mode === 'apply' ? 'active' : ''}
              onClick={() => {
                setMode('apply')
                setCurrentPhaseIndex(0)
              }}
            >
              {texts.modes.apply}
            </button>
            <button type="button" className={mode === 'about' ? 'active' : ''} onClick={() => setMode('about')}>
              {texts.modes.about}
            </button>
          </div>
        </div>
      </header>

      {mode === 'framework' && (
        <>
          <section className="intro-strip">
            <div className="intro-tile">
              <span>{texts.introTiles[0].label}</span>
              <strong>{texts.introTiles[0].value}</strong>
            </div>
            <div className="intro-tile">
              <span>{texts.introTiles[1].label}</span>
              <strong>{texts.introTiles[1].value}</strong>
            </div>
            <div className="intro-tile">
              <span>{texts.introTiles[2].label}</span>
              <strong>{texts.introTiles[2].value}</strong>
            </div>
          </section>

          <section className="framework-spotlight">
            <div className="framework-carousel">
              <article
                className="phase-card side-card left"
                onClick={goFrameworkLeft}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    goFrameworkLeft()
                  }
                }}
                aria-label={texts.navigation.prevAria(frameworkPrev.title)}
              >
                <p className="phase-index">{texts.phase} {frameworkPrevIndex + 1}</p>
                <p className="macro">{frameworkPrev.macroQuestion}</p>
                <h3>{frameworkPrev.title}</h3>
                <p>
                  <strong>{texts.labels.objective}:</strong> {frameworkPrev.objective}
                </p>
              </article>

              <article className="phase-card center-card">
                <p className="phase-index">{texts.phase} {frameworkPhaseIndex + 1}</p>
                <p className="macro">{frameworkCurrent.macroQuestion}</p>
                <h3>{frameworkCurrent.title}</h3>
                <p>
                  <strong>{texts.labels.directedQuestion}:</strong> {frameworkCurrent.directedQuestion}
                </p>
                <p>
                  <strong>{texts.labels.whatIs}:</strong> {frameworkCurrent.whatIs}
                </p>
                <p>
                  <strong>{texts.labels.objective}:</strong> {frameworkCurrent.objective}
                </p>
                <p>
                  <strong>{texts.labels.example}:</strong> {frameworkCurrent.example}
                </p>
                <div className="checklist">
                  <strong>{texts.labels.checklist}</strong>
                  <ul>
                    {frameworkCurrent.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <details className="references references-collapse">
                  <summary>{texts.labels.references}</summary>
                  <ul>
                    {frameworkCurrent.references.map((reference) => (
                      <li key={reference.abnt}>
                        <span>{reference.abnt}</span>
                        <a href={reference.link} target="_blank" rel="noreferrer">
                          {reference.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </article>

              <article
                className="phase-card side-card right"
                onClick={goFrameworkRight}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    goFrameworkRight()
                  }
                }}
                aria-label={texts.navigation.nextAria(frameworkNext.title)}
              >
                <p className="phase-index">{texts.phase} {frameworkNextIndex + 1}</p>
                <p className="macro">{frameworkNext.macroQuestion}</p>
                <h3>{frameworkNext.title}</h3>
                <p>
                  <strong>{texts.labels.objective}:</strong> {frameworkNext.objective}
                </p>
              </article>
            </div>

            <div className="framework-mobile-nav" aria-label={texts.navigation.mobileAria}>
              <button type="button" onClick={goFrameworkLeft} aria-label={texts.navigation.gotoPrevPhaseAria}>
                {texts.previous}
              </button>
              <p>
                {texts.phase} {frameworkPhaseIndex + 1} {texts.of} {phases.length}
              </p>
              <button type="button" onClick={goFrameworkRight} aria-label={texts.navigation.gotoNextPhaseAria}>
                {texts.next}
              </button>
            </div>

            <div className="framework-dots" aria-label={texts.navigation.phaseNavAria}>
              {phases.map((phase, index) => (
                <button
                  key={phase.id}
                  type="button"
                  className={index === frameworkPhaseIndex ? 'active' : ''}
                  onClick={() => goToFrameworkPhase(index)}
                  aria-label={texts.navigation.gotoPhaseAria(index + 1, phase.title)}
                  aria-current={index === frameworkPhaseIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {mode === 'apply' && (
        <section className="studio">
          <div className="apply-mobile-panel">
            <div className="apply-mobile-progress">
              <p>{texts.labels.designProgress}</p>
              <strong>{completion.percentage}%</strong>
              <span>
                {texts.labels.phasesCompleted(completion.completed, completion.total)}
              </span>
              <div className="wizard-track" aria-hidden="true">
                <span className="wizard-fill" style={{ width: `${completion.percentage}%` }} />
              </div>
            </div>

            <div className="apply-mobile-phase-picker">
              <label htmlFor="mobile-phase-picker">{texts.labels.currentPhase}</label>
              <select
                id="mobile-phase-picker"
                value={currentPhaseIndex}
                onChange={(event) => setCurrentPhaseIndex(Number(event.target.value))}
              >
                {phases.map((phase, index) => (
                  <option key={phase.id} value={index}>
                    {index + 1}. {phase.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="apply-mobile-actions">
              <button type="button" onClick={loadExamples}>
                {texts.labels.loadDraft}
              </button>
              <button type="button" onClick={clearApply}>
                {texts.labels.reset}
              </button>
              <button type="button" onClick={openPdfPreview}>
                {texts.labels.openPdfPreview}
              </button>
            </div>
          </div>

          <aside className="studio-sidebar">
            <div className="progress-card">
              <p>{texts.labels.designProgress}</p>
              <strong>{completion.percentage}%</strong>
              <span>
                {texts.labels.phasesCompleted(completion.completed, completion.total)}
              </span>
              <div className="wizard-track" aria-hidden="true">
                <span className="wizard-fill" style={{ width: `${completion.percentage}%` }} />
              </div>
            </div>

            <div className="steps-panel">
              {phases.map((phase, index) => (
                <button
                  key={phase.id}
                  type="button"
                  className={index === currentPhaseIndex ? 'active' : ''}
                  onClick={() => setCurrentPhaseIndex(index)}
                >
                  <span className="step-number">{index + 1}</span>
                  <span className="step-title">{phase.title}</span>
                  <span
                    className={`step-state ${phaseIsCompleted(phase.id) ? 'done' : ''}`}
                    aria-label={
                      phaseIsCompleted(phase.id) ? texts.labels.completedPhase : texts.labels.pendingPhase
                    }
                  />
                </button>
              ))}
            </div>

            <div className="actions">
              <button type="button" onClick={loadExamples}>
                {texts.labels.loadDraft}
              </button>
              <button type="button" onClick={clearApply}>
                {texts.labels.reset}
              </button>
              <button type="button" onClick={openPdfPreview}>
                {texts.labels.openPdfPreview}
              </button>
            </div>
          </aside>

          <article className="stage-card">
            <header className="stage-header">
              <p className="phase-index">
                {texts.phase} {currentPhaseIndex + 1} {texts.of} {phases.length}
              </p>
              <p className="macro">{currentPhase.macroQuestion}</p>
              <h2>{currentPhase.title}</h2>
            </header>

            <div className="stage-layout">
              <section className="stage-main">
                <label htmlFor={`answer-${currentPhase.id}`} className="input-label">
                  {texts.labels.buildPhase}
                </label>
                <textarea
                  id={`answer-${currentPhase.id}`}
                  value={currentPhaseApply.plan}
                  onChange={(event) => updatePlan(currentPhase.id, event.target.value)}
                  placeholder={texts.labels.textareaPlaceholder}
                  rows={11}
                />
                <p className="helper-line">
                  {texts.labels.tip}
                </p>

                <section className="inline-checklist" aria-label={texts.labels.checklist}>
                  <h3>{texts.labels.checklist}</h3>
                  <ul>
                    {currentPhase.checklist.map((item, itemIndex) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={currentPhaseApply.selectedChecklist.includes(itemIndex)}
                            onChange={() => toggleChecklist(currentPhase.id, itemIndex)}
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>

              <aside className="stage-support">
                <details open>
                  <summary>{texts.labels.guidance}</summary>
                  <p>
                    <strong>{texts.labels.directedQuestion}:</strong> {currentPhase.directedQuestion}
                  </p>
                  <p>
                    <strong>{texts.labels.whatIs}:</strong> {currentPhase.whatIs}
                  </p>
                  <p>
                    <strong>{texts.labels.objective}:</strong> {currentPhase.objective}
                  </p>
                  <p>
                    <strong>{texts.labels.example}:</strong> {currentPhase.example}
                  </p>
                </details>

                <details className="support-references">
                  <summary>{texts.labels.references}</summary>
                  <ul>
                    {currentPhase.references.map((reference) => (
                      <li key={reference.abnt}>
                        <span>{reference.abnt}</span>
                        <a href={reference.link} target="_blank" rel="noreferrer">
                          {reference.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </aside>
            </div>

            <footer className="wizard-nav">
              <button
                type="button"
                onClick={goToPreviousPhase}
                disabled={currentPhaseIndex === 0}
              >
                {texts.labels.previousPhase}
              </button>
              <button
                type="button"
                onClick={goToNextPhase}
                disabled={currentPhaseIndex === phases.length - 1}
              >
                {texts.labels.nextPhase}
              </button>
            </footer>
          </article>
        </section>
      )}

      {mode === 'about' && (
        <section className="about-section">
          <header className="about-header">
            <h2>{texts.aboutSection.title}</h2>
            <p>{texts.aboutSection.subtitle}</p>
          </header>

          <div className="about-grid">
            {teamMembers.map((member) => (
              <article key={member.name} className="about-card">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} loading="lazy" />
                ) : (
                  <div className="about-photo-fallback" aria-hidden="true">
                    {getMemberInitials(member.name)}
                  </div>
                )}
                <div className="about-content">
                  <h3>{member.name}</h3>
                  <p className={expandedProfiles[member.name] ? 'about-description expanded' : 'about-description'}>
                    {member.description}
                  </p>
                  {member.description.length > 220 && (
                    <button
                      type="button"
                      className="about-toggle"
                      onClick={() => toggleProfileDescription(member.name)}
                    >
                      {expandedProfiles[member.name] ? texts.aboutSection.readLess : texts.aboutSection.readMore}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default App
