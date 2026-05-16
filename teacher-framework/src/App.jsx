import { useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
import './App.css'

const sourceLinks = {
  interadPaper: 'file:///Users/rutecintra/Documents/framework/sources/2577101.2577106.pdf',
  limaTdic:
    'file:///Users/rutecintra/Documents/framework/sources/ARTIGO_IVONALDO_PEREIRA_DE_LIMA.pdf',
  collMonereo:
    'file:///Users/rutecintra/Documents/framework/sources/COLL_MONEREO_Psicologia%20da%20Educa%C3%A7%C3%A3o%20Virtual-p%C3%A1ginas.pdf',
  tangibleInterfaces:
    'file:///Users/rutecintra/Documents/framework/sources/Interfaces_tangiveis_e_o_design_de_ambientes_educa.pdf',
  tpack: 'file:///Users/rutecintra/Documents/framework/sources/Koehler_et_al_2013.pdf',
  didactics: 'file:///Users/rutecintra/Documents/framework/sources/Livro%20Didatica.pdf',
}

const phases = [
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
]

const defaultApplyData = phases.reduce((acc, phase) => {
  acc[phase.id] = {
    plan: '',
    selectedChecklist: [],
  }
  return acc
}, {})

function App() {
  const [mode, setMode] = useState('framework')
  const [applyData, setApplyData] = useState(defaultApplyData)

  const completion = useMemo(() => {
    const completed = phases.filter((phase) => applyData[phase.id].plan.trim().length > 0).length
    const total = phases.length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }, [applyData])

  const updatePlan = (phaseId, value) => {
    setApplyData((current) => ({
      ...current,
      [phaseId]: {
        ...current[phaseId],
        plan: value,
      },
    }))
  }

  const toggleChecklist = (phaseId, item) => {
    setApplyData((current) => {
      const selected = current[phaseId].selectedChecklist
      const nextSelected = selected.includes(item)
        ? selected.filter((entry) => entry !== item)
        : [...selected, item]

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
          selectedChecklist: [...phase.checklist],
        }
        return acc
      }, {}),
    )
  }

  const clearApply = () => {
    setApplyData(defaultApplyData)
  }

  const openPdfPreview = () => {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const marginX = 44
    const maxWidth = pageWidth - marginX * 2
    const bottomMargin = 48
    let cursorY = 52

    const ensurePageSpace = (neededHeight = 16) => {
      if (cursorY + neededHeight > pageHeight - bottomMargin) {
        doc.addPage()
        cursorY = 52
      }
    }

    const writeLine = (text, options = {}) => {
      const { fontSize = 11, bold = false, gapAfter = 8 } = options
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      doc.setFontSize(fontSize)
      const lines = doc.splitTextToSize(text, maxWidth)
      const estimatedHeight = lines.length * (fontSize + 2)
      ensurePageSpace(estimatedHeight + gapAfter)
      doc.text(lines, marginX, cursorY)
      cursorY += estimatedHeight + gapAfter
    }

    writeLine('Instructional Design Framework Report', { fontSize: 16, bold: true, gapAfter: 6 })
    writeLine(
      `Generated on ${new Date().toLocaleDateString('en-US')} at ${new Date().toLocaleTimeString(
        'en-US',
      )}.`,
      { fontSize: 10, gapAfter: 16 },
    )

    phases.forEach((phase, index) => {
      writeLine(`Phase ${index + 1}: ${phase.title}`, { fontSize: 13, bold: true, gapAfter: 6 })
      writeLine(`Macro question: ${phase.macroQuestion}`, { fontSize: 11, gapAfter: 4 })
      writeLine(`Directed question: ${phase.directedQuestion}`, { fontSize: 11, gapAfter: 6 })
      writeLine(
        `Teacher architecture: ${
          applyData[phase.id].plan.trim() || 'Not filled yet.'
        }`,
        { fontSize: 11, gapAfter: 6 },
      )

      const checklistText =
        applyData[phase.id].selectedChecklist.length > 0
          ? applyData[phase.id].selectedChecklist.join(' | ')
          : 'No checklist item selected.'
      writeLine(`Checked decisions: ${checklistText}`, { fontSize: 11, gapAfter: 6 })

      writeLine('ABNT references:', { fontSize: 11, bold: true, gapAfter: 4 })
      phase.references.forEach((reference) => {
        writeLine(`- ${reference.abnt}`, { fontSize: 10, gapAfter: 2 })
        writeLine(`Source link: ${reference.link}`, { fontSize: 10, gapAfter: 5 })
      })
      writeLine('', { fontSize: 10, gapAfter: 8 })
    })

    const blobUrl = doc.output('bloburl')
    window.open(blobUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Instructional Design Framework for Teachers</h1>
        <p>
          A seven-phase framework to plan, justify, and document technology-mediated learning
          activities.
        </p>
        <div className="mode-picker">
          <button
            type="button"
            className={mode === 'framework' ? 'active' : ''}
            onClick={() => setMode('framework')}
          >
            View framework
          </button>
          <button
            type="button"
            className={mode === 'example' ? 'active' : ''}
            onClick={() => setMode('example')}
          >
            View only example
          </button>
          <button
            type="button"
            className={mode === 'apply' ? 'active' : ''}
            onClick={() => setMode('apply')}
          >
            Apply framework
          </button>
        </div>
      </header>

      {mode === 'framework' && (
        <section className="panel">
          <h2>Framework overview</h2>
          <p>
            Each phase uses the same structure: directed question, meaning, objective, example,
            decisions/checklist, and ABNT references.
          </p>
        </section>
      )}

      {mode === 'example' && (
        <section className="panel">
          <h2>Example-only mode</h2>
          <p>
            This mode shows only the pre-filled model inspired by your requested teacher scenario.
          </p>
        </section>
      )}

      {mode === 'apply' && (
        <section className="panel apply-controls">
          <div>
            <h2>Apply mode</h2>
            <p>
              Fill each phase, mark decisions, and print a complete instructional design report.
            </p>
            <p className="progress">
              Completion: {completion.completed}/{completion.total} phases ({completion.percentage}
              %)
            </p>
          </div>
          <div className="actions">
            <button type="button" onClick={loadExamples}>
              Load Helena example as draft
            </button>
            <button type="button" onClick={clearApply}>
              Clear all answers
            </button>
            <button type="button" onClick={openPdfPreview}>
              Open PDF preview
            </button>
          </div>
        </section>
      )}

      <section className="phases-grid">
        {phases.map((phase) => {
          const phaseApply = applyData[phase.id]

          return (
            <article key={phase.id} className="phase-card">
              <p className="macro">{phase.macroQuestion}</p>
              <h3>{phase.title}</h3>
              <p>
                <strong>Directed question:</strong> {phase.directedQuestion}
              </p>
              <p>
                <strong>What it is:</strong> {phase.whatIs}
              </p>
              <p>
                <strong>Objective:</strong> {phase.objective}
              </p>
              {(mode === 'example' || mode === 'framework') && (
                <p>
                  <strong>Example (Helena case):</strong> {phase.example}
                </p>
              )}
              <div className="checklist">
                <strong>Decisions / checklist</strong>
                <ul>
                  {phase.checklist.map((item) => (
                    <li key={item}>
                      {mode === 'apply' ? (
                        <label>
                          <input
                            type="checkbox"
                            checked={phaseApply.selectedChecklist.includes(item)}
                            onChange={() => toggleChecklist(phase.id, item)}
                          />
                          {item}
                        </label>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {mode === 'apply' && (
                <div className="apply-answer">
                  <label htmlFor={`answer-${phase.id}`}>
                    <strong>Your phase architecture</strong>
                  </label>
                  <textarea
                    id={`answer-${phase.id}`}
                    value={phaseApply.plan}
                    onChange={(event) => updatePlan(phase.id, event.target.value)}
                    placeholder="Write your plan for this phase..."
                    rows={6}
                  />
                </div>
              )}
              <div className="references">
                <strong>ABNT references</strong>
                <ul>
                  {phase.references.map((reference) => (
                    <li key={reference.abnt}>
                      <span>{reference.abnt}</span>
                      <a href={reference.link} target="_blank" rel="noreferrer">
                        {reference.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default App
