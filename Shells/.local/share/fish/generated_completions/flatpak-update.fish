# flatpak-update
# Autogenerated from man page /usr/share/man/man1/flatpak-update.1.gz
complete -c flatpak-update -s h -l help --description 'Show help options and exit.'
complete -c flatpak-update -l user --description 'Update a per-user installation.'
complete -c flatpak-update -l system --description 'Update the default system-wide installation.'
complete -c flatpak-update -l installation --description 'Updates a system-wide installation specified by NAME among those defined in /…'
complete -c flatpak-update -l arch --description 'The architecture to update for.'
complete -c flatpak-update -l subpath --description 'Install only a subpath of the ref.'
complete -c flatpak-update -l commit --description 'Update to this commit, instead of the tip of the branch.'
complete -c flatpak-update -l no-deploy --description 'Download the latest version, but don\\*(Aqt deploy it.'
complete -c flatpak-update -l no-pull --description 'Don\\*(Aqt download the latest version, deploy whatever is locally available.'
complete -c flatpak-update -l no-related --description 'Don\\*(Aqt download related extensions, such as the locale data.'
complete -c flatpak-update -l no-deps --description 'Don\\*(Aqt update or install runtime dependencies when installing.'
complete -c flatpak-update -l app --description 'Only look for an app with the given name.'
complete -c flatpak-update -l appstream --description 'Update appstream for REMOTE, or all remotes if no remote is specified.'
complete -c flatpak-update -l runtime --description 'Only look for a runtime with the given name.'
complete -c flatpak-update -s y -l assumeyes --description 'Automatically answer yes to all questions (or pick the most prioritized answe…'
complete -c flatpak-update -l noninteractive --description 'Produce minimal output and avoid most questions.'
complete -c flatpak-update -l force-remove --description 'Remove old files even if they\\*(Aqre in use by a running application.'
complete -c flatpak-update -s v -l verbose --description 'Print debug information during command processing.'
complete -c flatpak-update -l ostree-verbose --description 'Print OSTree debug information during command processing.'

