package server

import (
	"net/http"

	"github.com/euvictorguedes/ask-me-anything/internal/store/pg"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type serverHandler struct {
	q *pg.Queries
	r *chi.Mux
}

func (h serverHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.r.ServeHTTP(w, r)
}

func NewHandler(q *pg.Queries) http.Handler {
	a := serverHandler{
		q: q,
	}

	r := chi.NewRouter()
	r.Use(middleware.RequestID, middleware.Recoverer, middleware.Logger)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Get("/subscribe/{room_id}", a.handleSubscribe)

	r.Route("/api", func(r chi.Router) {
		r.Route("/rooms", func(r chi.Router) {
			r.Post("/", a.handleCreateRoom)
			r.Get("/", a.handleGetRooms)

			r.Route("/{room_id}/messages", func(r chi.Router) {
				r.Post("/", a.handleCreateRoomMessage)
				r.Get("/", a.handleGetRoomMessages)

				r.Route("/{message_id}", func(r chi.Router) {
					r.Get("/", a.handleGetRoomMessage)
					r.Patch("/react", a.handleReactToMessage)
					r.Delete("/react", a.handleRemoveReactFromMessage)
					r.Patch("/answer", a.handleMarkMessageAsAnswered)
				})
			})
		})
	})

	a.r = r
	return a
}

func (h serverHandler) handleSubscribe(w http.ResponseWriter, r *http.Request)              {}
func (h serverHandler) handleCreateRoom(w http.ResponseWriter, r *http.Request)             {}
func (h serverHandler) handleGetRooms(w http.ResponseWriter, r *http.Request)               {}
func (h serverHandler) handleCreateRoomMessage(w http.ResponseWriter, r *http.Request)      {}
func (h serverHandler) handleGetRoomMessages(w http.ResponseWriter, r *http.Request)        {}
func (h serverHandler) handleGetRoomMessage(w http.ResponseWriter, r *http.Request)         {}
func (h serverHandler) handleReactToMessage(w http.ResponseWriter, r *http.Request)         {}
func (h serverHandler) handleRemoveReactFromMessage(w http.ResponseWriter, r *http.Request) {}
func (h serverHandler) handleMarkMessageAsAnswered(w http.ResponseWriter, r *http.Request)  {}
