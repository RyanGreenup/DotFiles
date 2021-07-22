

""" ##################################################
"####### My Vim Settings ##########################
"##################################################
"
"
"
""" Generic Settings
"##############################
"####### Generic Settings #####
"##############################

" set autochdir " this might bake plugins but it's just way too fucking confusing otherwise, I keep forgetting to hit `SPC f c d`
set nocompatible
set mouse=a " this is brillian for touch screen ; requires `apt install vim-gtk`
filetype plugin on
syntax on
set number "Absolute Number
"set autochdir "This will conflict with some things
"                " So instead I'm just going to be minful to open
"                vim in ranger in the desired working directory
nnoremap <silent><Leader>fcd :cd %:p:h<CR>
nnoremap <silent><Leader>fcd :lcd %:p:h<CR>

set relativenumber
imap jj <Esc> " What I'm Used to
imap fd <Esc> " What Spacemacs Uses
imap jk <Esc> " What Doom Uses

" If latent files get annoying consider doing:
" set undodir/.vim/undodir
" 	Or whatever directory
set ignorecase
set smartcase " if you search for something purely lowercase, it will do a case insensitive search
set autoread  "Automatically re-read files
set encoding=utf-8

""""" Keyboard Remaps
"""""" Leader Key
"This is probably for the best because matches spacemacs/Doom
"let mapleader="\<Space>"
map <Space> <Leader>
"""""" Remaps
nmap <Leader><Space> :Commands<CR>
nmap <C-x><C-k> :bd<CR>
nmap <Leader>rr "
nmap <leader>wd :q<CR>
nmap <leader>w <C-w>
nmap <leader>fd :! rm "%"
nmap <leader>ss :BLines<CR>
nmap <leader>bb :Buffers<CR>
map <leader>bp :bprev<CR>
nnoremap <silent><Leader>ff :Files<CR>

""""""" Clipboard
" Write file leader-clip-reymap
"
"
nnoremap <Leader>fs h:w<CR> 
vmap <Leader>y "+y
vmap <Leader>d "+d
nmap <Leader>p "+p
nmap <Leader>P "+P
vmap <Leader>p "+p
vmap <Leader>P "+P


""""" Switch to Markdown and LaTeX Quickly
nnoremap <Leader>t :setlocal filetype=tex<CR>
nnoremap <Leader>m :set syntax=markdown<CR> 



"""" Plugins
"############################## 
"###### Plugins ############### 
"############################## 

""""" Vim-Plug

" Set up if not already installed
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif


" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.config/nvim/plugged')

" Make sure you use single quotes

""""" Programming
""""" LSP
Plug 'neovim/nvim-lspconfig'
Plug 'nvim-lua/completion-nvim'
""""" LaTeX
Plug 'junegunn/fzf.vim'
Plug 'lervag/vimtex'
Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'
""""" Markdown
Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() } }
imap lv :MakrdownPreview<CR>
Plug 'plasticboy/vim-markdown'
 
""""" Easy Motion

Plug 'easymotion/vim-easymotion'

" <Leader>f{char} to move to {char}
map  <Leader>f <Plug>(easymotion-bd-f)
nmap <Leader>f <Plug>(easymotion-overwin-f)

" s{char}{char} to move to {char}{char}
nmap s <Plug>(easymotion-overwin-f2)

" Move to line
map <Leader>L <Plug>(easymotion-bd-jk)
nmap <Leader>L <Plug>(easymotion-overwin-line)

" Move to word
map  <Leader>w <Plug>(easymotion-bd-w)
nmap <Leader>w <Plug>(easymotion-overwin-w)



""""" End Plugins
" Initialize plugin system
call plug#end()

"""" LaTeX
""""" PlasticBoy
" This enables syntax highlighting  for Math environments
let g:vim_markdown_math = 1
    "Highlighting is necessary for UltiSnips
    "set syntax=latex sucks because headings don't get highlighted
" Autosave before BuffJump
let g:vim_markdown_autowrite = 1
" Conceal Bold etc.

""""" VimTeX
let g:vimtex_fold_enabled = 1
let g:vimtex_fold_levelmarker = "*"
let g:vimtex_compiler_latexmk = {
      \ 'options' : [
      \   '-shell-escape',
      \   '-silent',
      \   '-synctex=1',
      \   '-interaction=nonstopmode',
      \ ],
      \ 'build_dir' : 'livepreview',
      \}
"disable errors but for good cause
" to view quickfix warning buffer use `<leader>le` 
" they disappear with =fks= mode
"let g:vimtex_quickfix_enabled=0


"""" Programming
""""" Completion-Nvim (Completion Framework for LSP)
" https://github.com/nvim-lua/completion-nvim 

" On all Buffers
autocmd BufEnter * lua require'completion'.on_attach()
let g:completion_enable_snippet = 'UltiSnips'
" Use <Tab> and <S-Tab> to navigate through popup menu
inoremap <expr> <Tab>   pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

" Set completeopt to have a better completion experience
set completeopt=menuone,noinsert,noselect

" Avoid showing message extra message when using completion
set shortmess+=c

""""" LSP
lua require'lspconfig'.rust_analyzer.setup{}
lua require'lspconfig'.clangd.setup{}
lua require'lspconfig'.cssls.setup{}
lua require'lspconfig'.dockerls.setup{}
lua require'lspconfig'.gopls.setup{}
lua require'lspconfig'.gopls.setup{}
lua require'lspconfig'.html.setup{}
lua require'lspconfig'.java_language_server.setup{}
lua require'lspconfig'.texlab.setup{}
lua require'lspconfig'.pyright.setup{}
lua require'lspconfig'.julials.setup{}
lua require'lspconfig'.r_language_server.setup{}
lua require'lspconfig'.sqlls.setup{}
lua require'lspconfig'.stylelint_lsp.setup{}
lua require'lspconfig'.vala_ls.setup{}
lua require'lspconfig'.vimls.setup{}
lua require'lspconfig'.zls.setup{}
lua require'lspconfig'.texlab.setup{}

" Probably won't need these
" lua require'lspconfig'.dartls.setup{}
" lua require'lspconfig'.angularls.setup{}

""""" Tree Sitter


""" Modeline Folding
set modeline
set modelineexpr  "This does all the magic folding
   " This is always enabled in OG vim, in nvim it must be physically enabled
     " Vim will giv a warning about not recognising this command, which is
     " fine because it shouldn't and it notifies us that we are using vim and
     " not nvim. Google "vim modeline vulnerability 2019" for more info 


" Found this [here](https://vi.stackexchange.com/a/3820)

" vim:fdm=expr:fdl=0
" vim:fde=getline(v\:lnum)=~'^""'?'>'.(matchend(getline(v\:lnum),'""*')-2)\:'='
"
" Comments MUST be on the first column or this will break, that's the issue


