from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import sys

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for snappy local playback
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    server = ThreadingHTTPServer(('0.0.0.0', port), CustomHandler)
    print(f'Multi-threaded server running on http://localhost:{port}/')
    server.serve_forever()
