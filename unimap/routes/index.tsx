import { h } from "preact";
import { useSignal } from "@preact/signals";
import { Head } from "$fresh/runtime.ts";

// Tipos de dados para os cursos e semestres
type Review = {
  teacher: string;
};

type Course = {
  name: string;
  durationInHours: number;
  localSlug: string;
  recommendedCycle: number;
  minimumCycle: number;
  reviews: Review[];
  tags: string[];
  dependsOn: string[];
  unlocks: string[];
};

type Semester = {
  name: string;
  courses: Course[];
};

const semesters = [
  {
    name: "Semestre 1",
    courses: [
      { name: "Fundamentos de Matemática para Ciência da Computação 1", durationInHours: 60, localSlug: "fmcc1", recommendedCycle: 1, minimumCycle: 1, reviews: [{ teacher: "Prof. A" }], tags: ["Obrigatória"], dependsOn: [], unlocks: ["Fundamentos de Matemática para Ciência da Computação 2"] },
      { name: "Introdução à Computação", durationInHours: 45, localSlug: "ic", recommendedCycle: 1, minimumCycle: 1, reviews: [{ teacher: "Prof. B" }], tags: ["Obrigatória"], dependsOn: [], unlocks: ["Programação 1"] },
      { name: "Laboratório de Programação 1", durationInHours: 45, localSlug: "lp1", recommendedCycle: 1, minimumCycle: 1, reviews: [{ teacher: "Prof. C" }], tags: ["Obrigatória"], dependsOn: [], unlocks: ["Laboratório de Programação 2"] },
      { name: "Programação 1", durationInHours: 60, localSlug: "p1", recommendedCycle: 1, minimumCycle: 1, reviews: [{ teacher: "Prof. D" }], tags: ["Obrigatória"], dependsOn: ["Introdução à Computação"], unlocks: ["Programação 2"] },
      { name: "Direito e Cidadania", durationInHours: 30, localSlug: "dc", recommendedCycle: 1, minimumCycle: 1, reviews: [{ teacher: "Prof. E" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 2",
    courses: [
      { name: "Fundamentos de Matemática para Ciência da Computação 2", durationInHours: 60, localSlug: "fmcc2", recommendedCycle: 2, minimumCycle: 2, reviews: [{ teacher: "Prof. F" }], tags: ["Obrigatória"], dependsOn: ["Fundamentos de Matemática para Ciência da Computação 1"], unlocks: [] },
      { name: "Cálculo Diferencial e Integral 1", durationInHours: 60, localSlug: "cdi1", recommendedCycle: 2, minimumCycle: 2, reviews: [{ teacher: "Prof. G" }], tags: ["Obrigatória"], dependsOn: [], unlocks: ["Cálculo Diferencial e Integral 2"] },
      { name: "Laboratório de Programação 2", durationInHours: 45, localSlug: "lp2", recommendedCycle: 2, minimumCycle: 2, reviews: [{ teacher: "Prof. H" }], tags: ["Obrigatória"], dependsOn: ["Laboratório de Programação 1"], unlocks: [] },
      { name: "Programação 2", durationInHours: 60, localSlug: "p2", recommendedCycle: 2, minimumCycle: 2, reviews: [{ teacher: "Prof. I" }], tags: ["Obrigatória"], dependsOn: ["Programação 1"], unlocks: ["Estrutura de Dados e Algoritmos"] },
      { name: "Economia", durationInHours: 45, localSlug: "eco", recommendedCycle: 2, minimumCycle: 2, reviews: [{ teacher: "Prof. J" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 3",
    courses: [
      { name: "Lógica para Computação", durationInHours: 45, localSlug: "lc", recommendedCycle: 3, minimumCycle: 3, reviews: [{ teacher: "Prof. K" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Cálculo Diferencial e Integral 2", durationInHours: 60, localSlug: "cdi2", recommendedCycle: 3, minimumCycle: 3, reviews: [{ teacher: "Prof. L" }], tags: ["Obrigatória"], dependsOn: ["Cálculo Diferencial e Integral 1"], unlocks: [] },
      { name: "Laboratório de Estrutura de Dados e Algoritmos", durationInHours: 45, localSlug: "leda", recommendedCycle: 3, minimumCycle: 3, reviews: [{ teacher: "Prof. M" }], tags: ["Obrigatória"], dependsOn: ["Laboratório de Programação 2"], unlocks: [] },
      { name: "Estrutura de Dados e Algoritmos", durationInHours: 60, localSlug: "eda", recommendedCycle: 3, minimumCycle: 3, reviews: [{ teacher: "Prof. N" }], tags: ["Obrigatória"], dependsOn: ["Programação 2"], unlocks: [] },
      { name: "Álgebra Linear 1", durationInHours: 60, localSlug: "al1", recommendedCycle: 3, minimumCycle: 3, reviews: [{ teacher: "Prof. O" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 4",
    courses: [
      { name: "Teoria da Computação", durationInHours: 60, localSlug: "tc", recommendedCycle: 4, minimumCycle: 4, reviews: [{ teacher: "Prof. P" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Introdução à Probabilidade", durationInHours: 45, localSlug: "ip", recommendedCycle: 4, minimumCycle: 4, reviews: [{ teacher: "Prof. Q" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Organização e Arquitetura de Computadores", durationInHours: 60, localSlug: "oac", recommendedCycle: 4, minimumCycle: 4, reviews: [{ teacher: "Prof. R" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Banco de Dados 1", durationInHours: 60, localSlug: "bd1", recommendedCycle: 4, minimumCycle: 4, reviews: [{ teacher: "Prof. S" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Teoria dos Grafos", durationInHours: 60, localSlug: "tg", recommendedCycle: 4, minimumCycle: 4, reviews: [{ teacher: "Prof. T" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 5",
    courses: [
      { name: "Inteligência Artificial", durationInHours: 60, localSlug: "ia", recommendedCycle: 5, minimumCycle: 5, reviews: [{ teacher: "Prof. U" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Estatística Aplicada", durationInHours: 45, localSlug: "ea", recommendedCycle: 5, minimumCycle: 5, reviews: [{ teacher: "Prof. V" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Sistemas Operacionais", durationInHours: 60, localSlug: "so", recommendedCycle: 5, minimumCycle: 5, reviews: [{ teacher: "Prof. W" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Projeto de Software", durationInHours: 60, localSlug: "ps", recommendedCycle: 5, minimumCycle: 5, reviews: [{ teacher: "Prof. X" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Engenharia de Software", durationInHours: 60, localSlug: "es", recommendedCycle: 5, minimumCycle: 5, reviews: [{ teacher: "Prof. Y" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 6",
    courses: [
      { name: "Programação Concorrente", durationInHours: 60, localSlug: "pc", recommendedCycle: 6, minimumCycle: 6, reviews: [{ teacher: "Prof. Z" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Análise de Sistemas", durationInHours: 45, localSlug: "as", recommendedCycle: 6, minimumCycle: 6, reviews: [{ teacher: "Prof. AA" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Análise e Técnicas de Algoritmos", durationInHours: 60, localSlug: "ata", recommendedCycle: 6, minimumCycle: 6, reviews: [{ teacher: "Prof. BB" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt1", recommendedCycle: 6, minimumCycle: 6, reviews: [{ teacher: "Prof. CC" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt2", recommendedCycle: 6, minimumCycle: 6, reviews: [{ teacher: "Prof. DD" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 7",
    courses: [
      { name: "Compiladores", durationInHours: 60, localSlug: "comp", recommendedCycle: 7, minimumCycle: 7, reviews: [{ teacher: "Prof. EE" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Metodologia Científica", durationInHours: 45, localSlug: "mc", recommendedCycle: 7, minimumCycle: 7, reviews: [{ teacher: "Prof. FF" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt3", recommendedCycle: 7, minimumCycle: 7, reviews: [{ teacher: "Prof. GG" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt4", recommendedCycle: 7, minimumCycle: 7, reviews: [{ teacher: "Prof. HH" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt5", recommendedCycle: 7, minimumCycle: 7, reviews: [{ teacher: "Prof. II" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 8",
    courses: [
      { name: "Língua Portuguesa", durationInHours: 30, localSlug: "lp", recommendedCycle: 8, minimumCycle: 8, reviews: [{ teacher: "Prof. JJ" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Projeto em Computação 1", durationInHours: 60, localSlug: "pc1", recommendedCycle: 8, minimumCycle: 8, reviews: [{ teacher: "Prof. KK" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt6", recommendedCycle: 8, minimumCycle: 8, reviews: [{ teacher: "Prof. LL" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt7", recommendedCycle: 8, minimumCycle: 8, reviews: [{ teacher: "Prof. MM" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt8", recommendedCycle: 8, minimumCycle: 8, reviews: [{ teacher: "Prof. NN" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
  {
    name: "Semestre 9",
    courses: [
      { name: "Trabalho de Conclusão de Curso", durationInHours: 90, localSlug: "tcc", recommendedCycle: 9, minimumCycle: 9, reviews: [{ teacher: "Prof. OO" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Projeto em Computação 2", durationInHours: 60, localSlug: "pc2", recommendedCycle: 9, minimumCycle: 9, reviews: [{ teacher: "Prof. PP" }], tags: ["Obrigatória"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt9", recommendedCycle: 9, minimumCycle: 9, reviews: [{ teacher: "Prof. QQ" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt10", recommendedCycle: 9, minimumCycle: 9, reviews: [{ teacher: "Prof. RR" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
      { name: "Optativa", durationInHours: 45, localSlug: "opt11", recommendedCycle: 9, minimumCycle: 9, reviews: [{ teacher: "Prof. SS" }], tags: ["Optativa"], dependsOn: [], unlocks: [] },
    ],
  },
];

// Componente que renderiza as informações detalhadas de um curso
const CourseInfo = ({ course }: { course: Course }) => (
  <div class="mt-4 p-4 bg-gray-800 text-white rounded-lg">
    <h3 class="text-xl font-bold mb-2">{course.name}</h3>
    <p><strong>Duração:</strong> {course.durationInHours} horas</p>
    <p><strong>Slug:</strong> {course.localSlug}</p>
    <p><strong>Ciclo Recomendado:</strong> {course.recommendedCycle}</p>
    <p><strong>Ciclo Mínimo:</strong> {course.minimumCycle}</p>
    <p><strong>Professor:</strong> {course.reviews.map(review => review.teacher).join(", ")}</p>
    <p><strong>Tags:</strong> {course.tags.join(", ")}</p>
    <p><strong>Depende de:</strong> {course.dependsOn.join(", ")}</p>
    <p><strong>Libera:</strong> {course.unlocks.join(", ")}</p>
  </div>
);

// Componente que renderiza um botão de curso com suas informações
const CourseButton = ({ course, onClick, colorClass }: { course: Course, onClick: () => void, colorClass: string }) => (
  <div class="w-full mb-2 relative group">
    <button
      onClick={onClick}
      class={`w-full px-4 py-2 rounded-lg text-center transition-colors duration-300 text-sm ${colorClass}`}
    >
      {course.name}
    </button>
    <div class="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
      <p><strong>Duração:</strong> {course.durationInHours} horas</p>
      <p><strong>Slug:</strong> {course.localSlug}</p>
      <p><strong>Ciclo Recomendado:</strong> {course.recommendedCycle}</p>
      <p><strong>Ciclo Mínimo:</strong> {course.minimumCycle}</p>
      <p><strong>Professor:</strong> {course.reviews.map(review => review.teacher).join(", ")}</p>
      <p><strong>Tags:</strong> {course.tags.join(", ")}</p>
      <p><strong>Depende de:</strong> {course.dependsOn.join(", ")}</p>
      <p><strong>Libera:</strong> {course.unlocks.join(", ")}</p>
    </div>
  </div>
);

// Componente principal da aplicação
export default function Home() {
  const selectedCourse = useSignal<string | null>(null);

  const handleClick = (courseName: string) => {
    selectedCourse.value = courseName;
  };

  // Função que obtém os pré-requisitos de um curso
  const getPrereqs = (courseName: string | null) => {
    if (!courseName) return [];
    return semesters
      .flatMap((semester) => semester.courses)
      .filter((course) => course.unlocks.includes(courseName))
      .map((course) => course.name);
  };

  // Função que obtém os cursos desbloqueados por um curso
  const getUnlocks = (courseName: string | null) => {
    if (!courseName) return [];
    return semesters
      .flatMap((semester) => semester.courses)
      .filter((course) => course.dependsOn.includes(courseName))
      .map((course) => course.name);
  };

  // Função que define a cor da classe com base no curso selecionado
  const getColorClass = (courseName: string) => {
    if (courseName === selectedCourse.value) return "bg-[#02f67c]";
    if (getPrereqs(selectedCourse.value).includes(courseName)) return "bg-[#02f67c]";
    if (getUnlocks(selectedCourse.value).includes(courseName)) return "bg-[#02f67c]";
    return "bg-gray-800 hover:bg-gray-700";
  };

  return (
    <div class="px-4 py-8 mx-auto bg-gray-900 text-white min-h-screen">
      <Head>
        <title>Decograd</title>
      </Head>
      <nav class="fixed top-0 left-0 w-full bg-[#02f67c] p-4 shadow-md z-10">
        <div class="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">Decograd</h1>
          <div>
            <a href="#semesters" class="text-white hover:text-gray-900 transition-colors">Semestres</a>
          </div>
        </div>
      </nav>
      <div class="max-w-screen-xl mx-auto flex flex-col items-center mt-16">
        <h1 class="text-4xl font-bold mb-8 text-[#02f67c]">Ciência da Computação - Graduação</h1>
        <div id="semesters" class="w-full grid grid-cols-9 gap-4">
          {semesters.map((semester, index) => (
            <div key={index} class="flex flex-col items-center">
              <h2 class="text-xl font-bold mb-4 text-center text-[#02f67c]">{index + 1}</h2>
              {semester.courses.map((course, idx) => (
                <CourseButton
                  key={idx}
                  course={course}
                  onClick={() => handleClick(course.name)}
                  colorClass={getColorClass(course.name)}
                />
              ))}
            </div>
          ))}
        </div>
        {selectedCourse.value && (
          <CourseInfo
            course={semesters
              .flatMap((semester) => semester.courses)
              .find((course) => course.name === selectedCourse.value)!}
          />
        )}
      </div>
    </div>
  );
}
