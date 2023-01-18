from Projeto.Modelo.Aluno import Aluno
import sqlite3
bancoDeDados = 'aluno.bd' #caminho para um arquivo

class AlunoBD():

    def __init__(self):
        with sqlite3.connect(bancoDeDados) as banco:
            banco.execute('''create table if not exists aluno(
                            id integer not null primary key autoincrement,
                            nome text not null,
                            email text not null,
                            cidade text not null,
                            gosto text not null,
                            data text not null,
                            ra text not null,
                            curso text not null,
                            dificuldade text not null)''')

    def incluirAluno(self, aluno):
        with sqlite3.connect(bancoDeDados) as banco:
            cursor = banco.cursor()
            cursor.execute('''insert into aluno(nome, email, cidade, gosto, data, ra, curso, dificuldade)
                              values(?, ?, ?, ?, ?, ?, ?, ?)''', [aluno.nome, 
                                                                  aluno.email, 
                                                                  aluno.cidade,
                                                                  aluno.gosto,
                                                                  aluno.data, 
                                                                  aluno.ra,
                                                                  aluno.curso, 
                                                                  aluno.dificuldade])
            aluno.id = cursor.lastrowid

    def alterarAluno(self, aluno):
        with sqlite3.connect(bancoDeDados) as banco:
            banco.execute('''update aluno set nome = ?, email = ?, cidade = ?, gosto = ?, data = ?, 
                            ra = ?, curso = ?, dificuldade = ? where id = ?''', [aluno.nome, 
                                                                                 aluno.email, 
                                                                                 aluno.cidade,
                                                                                 aluno.gosto,
                                                                                 aluno.data, 
                                                                                 aluno.ra,
                                                                                 aluno.curso, 
                                                                                 aluno.dificuldade,
                                                                                 aluno.id])

    def excluirAluno(self, id):
        with sqlite3.connect(bancoDeDados) as banco:
            banco.execute('delete from aluno where id = ?', [id])

    def consultarAluno(self, id=None):
        '''Se um id for passado como parâmetro, o método consultarAluno
           tenta devolver um único aluno se esse id existir na tabela
           Caso id seja None, então o método consultarAluno irá devolver uma lista
           com todos os alunos
        '''
        with sqlite3.connect(bancoDeDados) as banco:
            if id:
                dados = banco.execute('''Select id, nome, email, cidade, gosto, data, ra, curso, dificuldade from aluno where id = ?''', [id])
                dados = dados.fetchone() #colunas extraidas da consulta
                if dados:
                    resultado = Aluno(dados[0], dados[1], dados[2], dados[3], dados[4], dados[5], dados[6], dados[7], dados[8])
                    return resultado
            else:
                listaAlunos = []
                dados = banco.execute('Select id, nome, email, cidade, gosto, data, ra, curso, dificuldade from aluno')
                dados = dados.fetchall()
                for linha in dados:
                    a = Aluno(linha[0], linha[1], linha[2], linha[3], linha[4], linha[5], linha[6], linha[7], linha[8])
                    listaAlunos.append(a)
                return listaAlunos