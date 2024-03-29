
;; Set up package.el to work with MELPA
(require 'package)
; Slow Start
 (add-to-list 'package-archives
              '("melpa" . "https://melpa.org/packages/"))
 (package-initialize)
 (package-refresh-contents t)


(unless (package-installed-p 'evil)
  (package-install 'evil))


(unless (package-installed-p 'texfrag)
  (package-install 'texfrag))

(unless (package-installed-p 'counsel)
  (package-install 'counsel))

(unless (package-installed-p 'org-ref)
  (package-install 'org-ref))

;; Download Evil
(unless (package-installed-p 'evil)
  (package-install 'evil))

;; Enable Evil
(setq evil-want-C-u-scroll t)
(require 'evil)
(evil-mode 1)

;; Download texfrag
(unless (package-installed-p 'texfrag)
  (package-install 'texfrag))

;; Enable texfrag
(require 'texfrag)
(texfrag-mode 1)

(defun dark ()
    (setq frame-background-mode 'dark)
    (set-background-color "#3f3f3f")
    (set-foreground-color "#dcdccc")
    (set-face-attribute 'default nil
                        :foreground (face-foreground 'default)
                        :background (face-background 'default))
    )
(dark)

;; Enable counsel
(require 'counsel)
(require 'org-ref)




;; Shell Escape in AucTeX
(with-eval-after-load 'tex
  (add-to-list 'safe-local-variable-values
               '(TeX-command-extra-options . "-shell-escape")))
