class Logger(object):

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        print ("----------------")
        print ("request Recieved")
        print (start_response)
        print ("----------------")
        return self.app(environ, start_response)