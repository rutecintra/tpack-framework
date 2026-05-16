# Teacher Experience Studio

Teacher Experience Studio is a web platform for designing technology-mediated lessons through a structured instructional design framework.

## Objective

The goal of this project is to help teachers build coherent lesson plans by connecting:

- learning objectives;
- instructional strategies;
- technology choices with pedagogical purpose; and
- evidence of student learning.

Instead of selecting tools first, the platform supports phase-by-phase pedagogical decision-making.

## Why It Is Important

Many digital lesson plans become superficial when technology only replaces traditional activities. This project addresses that challenge by making instructional decisions explicit, documented, and evidence-oriented.

The framework helps educators:

- align pedagogy, content, and technology;
- improve planning quality and consistency;
- justify each instructional decision;
- increase inclusion and contextual relevance; and
- generate documentation-ready outputs for reflection and institutional use.

## Main Features

- Seven-phase instructional design process.
- Bilingual experience (English and Portuguese).
- Checklist-based phase decisions.
- ABNT references with source links.
- PDF export of the completed planning report.

## Project Structure

- `teacher-framework/`: React + Vite application source code.
- `teacher-framework/public/sources/`: reference PDF files served in production.
- `netlify.toml`: Netlify build configuration.

## Run Locally

```bash
cd teacher-framework
npm install
npm run dev
```

## Build for Production

```bash
cd teacher-framework
npm run build
npm run preview
```

## Deployment

This repository is configured for Netlify deployment with:

- base directory: `teacher-framework`
- build command: `npm run build`
- publish directory: `dist`
