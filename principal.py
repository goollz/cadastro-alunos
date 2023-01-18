from Projeto.Modelo.Aluno import Aluno
from Projeto.Persistencia.AlunoBD import AlunoBD

aluno1 = Aluno(None, 'Gustavo','gustavo@gmail.com', 'Presidente Prudente', 'SIM', '12/10/2001', '101112130', 'Ciência da Computação', 'MEDIANA')
aluno2 = Aluno(None, 'Marcos', 'marcos@gmail.com', 'Presidente Prudente', 'SIM', '03/04/2001', '102541369', 'Sistemas para Informação', 'MEDIANA')
aluBD  = AlunoBD()
aluBD.incluirAluno(aluno1)
aluBD.incluirAluno(aluno2)

'''for aluno in aluBD.consultarAluno():
    print(aluno.nome, aluno.id, aluno.gosto)'''