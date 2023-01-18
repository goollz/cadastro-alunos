#GUSTAVO GARCIA DE CAMPOS 101911130
import cherrypy
import cherrypy_cors
import os
from Projeto.Modelo.Aluno import Aluno
from Projeto.Persistencia.AlunoBD import AlunoBD

@cherrypy.expose
class Alunos(object):

    #Definindo os verbos HTTP
    @cherrypy.tools.accept(media='text/plain')
    @cherrypy.tools.json_out()
    def GET(self, id=None):
        alunoBD = AlunoBD()
        if id:
            aluno = alunoBD.consultarAluno(id)
            if aluno:
                return aluno.toJson()
        else:
            alunos = alunoBD.consultarAluno()
            listaAlunos = []
            for aluno in alunos:
                listaAlunos.append(aluno.toJson())
            return listaAlunos

    @cherrypy.tools.accept(media='application/json')
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        dados = cherrypy.request.json
        aluno = Aluno(id=dados['id'],
                      nome=dados['nome'],
                      email=dados['email'],
                      cidade=dados['cidade'],
                      gosto=dados['gosto'],
                      data=dados['data'],
                      ra=dados['ra'],
                      curso=dados['curso'],
                      dificuldade=dados['dificuldade'])
        alunoBD = AlunoBD()
        alunoBD.incluirAluno(aluno)
        return aluno.id

    @cherrypy.tools.accept(media='application/json')
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def PUT(self):
        dados = cherrypy.request.json
        aluno = Aluno(dados['id'],
                      dados['nome'],
                      dados['email'],
                      dados['cidade'],
                      dados['gosto'],
                      dados['data'],
                      dados['ra'],
                      dados['curso'],
                      dados['dificuldade'])
        alunoBD = AlunoBD()
        alunoBD.alterarAluno(aluno)

    @cherrypy.tools.accept(media='text/plain')
    @cherrypy.tools.json_out()
    def DELETE(self, id=None):
        if id:
            alunoBD = AlunoBD()
            alunoBD.excluirAluno(id)

    def OPTIONS(self):
        cherrypy_cors.preflight(allowed_methods=['GET', 'POST', 'PUT', 'DELETE'])

if __name__ == '__main__':
    conf = {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(r'E:\Cadastro de Alunos\Projeto'),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/plain'),('Access-Control-Allow-Origin', '*')]
        },
        '/publico':
            {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': './publico'
            }
    }
    cherrypy.quickstart(Alunos(), '/alunos', conf)