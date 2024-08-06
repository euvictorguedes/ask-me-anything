package server

import (
	"net/http"

	"github.com/euvictorguedes/ask-me-anything/internal/store/pg"

	"github.com/go-chi/chi/v5"
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

	a.r = r
	return a
}
