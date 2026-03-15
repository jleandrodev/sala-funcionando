-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "faixaEtaria" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "alunosNEE" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "nome" TEXT,
    "condicao" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protocolo" (
    "id" TEXT NOT NULL,
    "condicao" TEXT NOT NULL,
    "subSituacao" TEXT NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Protocolo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtapaProtocolo" (
    "id" TEXT NOT NULL,
    "protocoloId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "instrucao" TEXT NOT NULL,
    "oQueEvitar" TEXT,
    "frasesProntas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EtapaProtocolo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoAtendimento" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "protocoloId" TEXT NOT NULL,
    "alunoId" TEXT,
    "etapaAlcancada" INTEGER NOT NULL,
    "helpAcionado" BOOLEAN NOT NULL DEFAULT false,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoEmergencia" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContatoEmergencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_userId_key" ON "Professor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaProtocolo" ADD CONSTRAINT "EtapaProtocolo_protocoloId_fkey" FOREIGN KEY ("protocoloId") REFERENCES "Protocolo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAtendimento" ADD CONSTRAINT "HistoricoAtendimento_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAtendimento" ADD CONSTRAINT "HistoricoAtendimento_protocoloId_fkey" FOREIGN KEY ("protocoloId") REFERENCES "Protocolo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAtendimento" ADD CONSTRAINT "HistoricoAtendimento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContatoEmergencia" ADD CONSTRAINT "ContatoEmergencia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
