class Aluno():
    
    def __init__(self, id=None, nome='vazio', email='vazio', cidade='vazio', gosto='vazio', data='vazio', ra='vazio', curso='vazio', dificuldade='vazio'):
        self.__id = id
        self.__nome = nome
        self.__email = email
        self.__cidade = cidade
        self.__gosto = gosto
        self.__data = data
        self.__ra = ra
        self.__curso = curso
        self.__dificuldade = dificuldade

    #GET e SET id
    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, valor):
        self.__id = valor

    #GET e SET nome
    @property
    def nome(self):
        return self.__nome

    @nome.setter
    def nome(self, valor):
        self.__nome = valor

    #GET e SET email
    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, valor):
        self.__email = valor

    #GET e SET cidade
    @property
    def cidade(self):
        return self.__cidade

    @cidade.setter
    def cidade(self, valor):
        self.__cidade = valor

    #GET e SET gosto
    @property
    def gosto(self):
        return self.__gosto

    @gosto.setter
    def gosto(self, valor):
        self.__gosto = valor

    #GET e SET data
    @property
    def data(self):
        return self.__data

    @data.setter
    def data(self, valor):
        self.__data = valor

    #GET e SET ra
    @property
    def ra(self):
        return self.__ra

    @ra.setter
    def ra(self, valor):
        self.__ra = valor

    #GET e SET curso
    @property
    def curso(self):
        return self.__curso

    @curso.setter
    def curso(self, valor):
        self.__curso = valor

    #GET e SET dificuldade
    @property
    def dificuldade(self):
        return self.__dificuldade

    @dificuldade.setter
    def dificuldade(self, valor):
        self.__dificuldade = valor

    def toJson(self):
        '''Método para permitir que um objeto Aluno seja transformado em um dicionário para
           só depois ser transformado em JSON
        '''
        aDict = {} #dicionário vazio
        aDict['id'] = self.__id
        aDict['nome'] = self.__nome
        aDict['email'] = self.__email
        aDict['cidade'] = self.__cidade
        aDict['gosto'] = self.__gosto
        aDict['data'] = self.__data
        aDict['ra'] = self.__ra
        aDict['curso'] = self.__curso
        aDict['dificuldade'] = self.__dificuldade
        return aDict