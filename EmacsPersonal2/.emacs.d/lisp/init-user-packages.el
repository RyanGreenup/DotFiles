;;; init-user-packages.el --- All Packages for Emacs using straight.el -*- lexical-binding: t -*-
;;; Commentary:
;;; Code:


;;;; Set up straight

;;;; Set up Use Package
;; This is convenient for implementing other peoples configs and
;; having bindings and everything all together.  This also integrates
;; with straight
(straight-use-package 'use-package)
(setq straight-use-package-by-default t)

;;;; Download Evil
(straight-use-package 'evil)
    (when (version< emacs-version "28")
    (message "undo-redo implemented in in Emacs 28, Emacs < 28 require undo-tree")
    (message "Currently using undo tree on all (for the very convenient tree)")
    )
    (straight-use-package 'undo-tree)
    (global-undo-tree-mode 1)
    (setq evil-undo-system 'undo-tree)

(straight-use-package 'evil-escape)
(straight-use-package 'fzf)

;;;; Dokuwiki
(straight-use-package 'dokuwiki-mode)
(straight-use-package 'ox-wk) ;; MUST (load-library) and choose ox-wk
;;;; Org Stuff
(use-package texfrag
      :straight t
      :hook
      (after-init . texfrag-global-mode)
		      )

(straight-use-package 'org-super-agenda)
(straight-use-package 'org-superstar)
;;;;; Org Roam
(use-package org-roam
      :straight t
      :ensure t
      :hook
      (after-init . org-roam-mode)
      :custom
      (org-roam-directory "~/Notes/Org/roam/")
      :bind (:map org-roam-mode-map
              (("C-c n l" . org-roam)
               ("C-c n f" . org-roam-find-file)
               ("C-c n g" . org-roam-graph))
              :map org-mode-map
              (("C-c n i" . org-roam-insert))
              (("C-c n I" . org-roam-insert-immediate))))
(straight-use-package 'org-ref) ;; does not declare autoloads! MUST
				;; use (require 'org-ref) somewhere
				;; (called in init-org)
;;;;; Org Roam Server
(use-package org-roam-server
  :straight t
  :ensure t
  :config
  (setq org-roam-server-host "127.0.0.1"
        org-roam-server-port 8080
        org-roam-server-authenticate nil
        org-roam-server-export-inline-images t
        org-roam-server-serve-files nil
        org-roam-server-served-file-extensions '("pdf" "mp4" "ogv")
        org-roam-server-network-poll t
        org-roam-server-network-arrows nil
        org-roam-server-network-label-truncate t
        org-roam-server-network-label-truncate-length 60
        org-roam-server-network-label-wrap-length 20))
;;;; Interface
;;;;; Scrolling
(straight-use-package 'smooth-scrolling)    ;; Keep Point centred when using up/down on KB
;;;;; Helm
(straight-use-package 'helm) 
;; Import when idle because it takes 0.2 seconds
;; (run-with-idle-timer 1 nil (lambda () (helm-mode 1)(message "Enabled Helm Mode after Idle Time"))) 
;; (add-hook 'after-init-hook (lambda () (helm-mode 1)(message "Enabled Helm Mode after Idle Time")))
;;  ;; SLOW This takues 0.2 sec, 

(straight-use-package 'helm-swoop)
(straight-use-package 'helm-org-rifle)
(straight-use-package 'helm-rg)
(straight-use-package 'helm-unicode)

;;;;; Ivy
;; (straight-use-package 'ivy)
;; (straight-use-package 'counsel)
;; (straight-use-package 'swiper)

;;;;; Pop Win
(straight-use-package 'popwin)
(popwin-mode 1)

;;;; Themes
(straight-use-package 'dracula-theme)
(straight-use-package 'zenburn-theme)
(straight-use-package 'color-theme-sanityinc-tomorrow)
(straight-use-package 'faff-theme)
(straight-use-package 'lab-themes)
(straight-use-package 'flucui-themes)
(straight-use-package 'material-theme)
(straight-use-package 'leuven-theme)
(setq custom-safe-themes t)
(defun apply-elegance-style ()
  (interactive)
  (require 'elegance)
)

;;;; Beacon
(straight-use-package 'beacon)
(setq beacon-blink-when-window-scrolls nil)
(setq beacon-blink-when-window-changes t)
(setq beacon-blink-when-point-moves t)
(beacon-mode 1)

;;;; Notes
(straight-use-package 'markdown-mode)

;;;; Git
(straight-use-package 'magit)
(straight-use-package 'git-timemachine)
(straight-use-package 'git-gutter)
(add-hook 'after-init-hook
	  (lambda ()
		(global-git-gutter-mode +1)
	    )
	  )


;;;; Programming
(straight-use-package 'ess)
(straight-use-package 'hl-todo)
(straight-use-package 'highlight-indent-guides)
(global-hl-todo-mode 1)
;;;;; Company Mode
(straight-use-package 'company)
(global-set-key (kbd "C-SPC") 'company-complete)
(global-set-key (kbd "C-S-SPC") 'company-yasnippet)
(setq company-tooltip-idle-delay 0)              ;; This can cause slow downs
(setq company-idle-delay 0)                      ;; on a lean emacs it's really nice though
(add-hook 'after-init-hook 'global-company-mode)
;;;;; eglot
(straight-use-package 'eglot)
(add-hook 'python-mode-hook 'eglot-ensure)
(add-hook 'julia-mode-hook '(lambda () (eglot-jl-init) (eglot-ensure)))
(add-hook 'ess-r-mode-hook (lambda ()
			     (eglot-ensure)  
			     (when (require 'helm nil 'noerror)
			       (helm-mode -1)
			       )
			     )
	  )
;; (add-hook 'prog-mode-hook 'eglot-ensure)
(add-hook 'prog-mode-hook 'hs-minor-mode)
(add-hook 'prog-mode-hook 'outshine-mode)
;;;;; Julia Stuff
(straight-use-package 'eglot-jl)
(straight-use-package 'ob-ess-julia)
(straight-use-package 'shell)
(straight-use-package 'julia-mode)
(add-to-list 'auto-mode-alist '("\\.jl\\'" . ess-julia-mode))


;;;;; YaSnippet
(straight-use-package 'yasnippet)
(straight-use-package 'yasnippet-snippets)

(yas-global-mode 1)
;;;; Modeline
;;;;; Doom
;; (straight-use-package 'doom-modeline)
;; (straight-use-package 'all-the-icons)
;; (straight-use-package 'minions)
;;;;; Spacemacs
;; See ./init-spacemacs-modeline.el
;; If I decide not to use it I may as well not load these
;;;; Shell
(straight-use-package 'vterm)

;;;; Profiling
(straight-use-package 'esup)

;;;; Keybindings
;;;; Which Key
(straight-use-package 'which-key)
;;;;; Hydra
(straight-use-package 'hydra)

;;;; Outshine Mode
(straight-use-package 'outshine)
(add-hook 'prog-mode-hook '(lambda () (outshine-mode 1)))

;;; Golden Ratio Mode
(straight-use-package 'golden-ratio)
(add-hook 'after-init-hook (lambda ()
			     (golden-ratio-mode 1)			;; Enable to set commands
			     (setq golden-ratio-extra-commands
				    (append golden-ratio-extra-commands
					    '(evil-window-left
						evil-window-right
						evil-window-up
						evil-window-down
						select-window-1
						select-window-2
						select-window-3
						select-window-4
						select-window-5)))	;; Set to work with Evil
			     (setq golden-ratio-mode nil)		;; Disable because it's annoying
			     ))


(provide 'init-user-packages)
;;; init-user-packages.el ends here
