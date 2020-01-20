# rtmpgw
# Autogenerated from man page /usr/share/man/man8/rtmpgw.8.gz
complete -c rtmpgw -l 'rtmp		-rurl' --description 'URL of the server and media content.'
complete -c rtmpgw -l 'host		-nhostname' --description 'Overrides the hostname in the RTMP URL.'
complete -c rtmpgw -l 'port		-cport' --description 'Overrides the port number in the RTMP URL.'
complete -c rtmpgw -l 'protocol	-lnumber' --description 'Overrides the protocol in the RTMP URL.'
complete -c rtmpgw -l 'socks		-Shost:port' --description 'Use the specified SOCKS4 proxy.'
complete -c rtmpgw -l 'app		-aapp' --description 'Name of application to connect to on the RTMP server.'
complete -c rtmpgw -l 'tcUrl		-turl' --description 'URL of the target stream.  Defaults to rtmp[e]://host[:port]/app/playpath.'
complete -c rtmpgw -l 'pageUrl		-purl' --description 'URL of the web page in which the media was embedded.'
complete -c rtmpgw -l 'swfUrl		-surl' --description 'URL of the SWF player for the media.  By default no value will be sent.'
complete -c rtmpgw -l 'flashVer	-fversion' --description 'Version of the Flash plugin used to run the SWF player.'
complete -c rtmpgw -l 'auth		-ustring' --description 'An authentication string to be appended to the Connect message.'
complete -c rtmpgw -l 'conn		-Ctype:data' --description 'Append arbitrary AMF data to the Connect message.'
complete -c rtmpgw -l 'playpath	-ypath' --description 'Overrides the playpath parsed from the RTMP URL.'
complete -c rtmpgw -l 'live		-v' --description 'Specify that the media is a live stream.'
complete -c rtmpgw -l 'subscribe	-dstream' --description 'Name of live stream to subscribe to.  Defaults to R playpath .'
complete -c rtmpgw -l 'start		-Anum' --description 'Start at  num seconds into the stream.  Not valid for live streams.'
complete -c rtmpgw -l 'stop		-Bnum' --description 'Stop at  num seconds into the stream.'
complete -c rtmpgw -l 'buffer		-bnum' --description 'Set buffer time to  num milliseconds.  The default is 20000.'
complete -c rtmpgw -l 'timeout		-mnum' --description 'Timeout the session after  num seconds without receiving any data from the se…'
complete -c rtmpgw -l 'token		-Tkey' --description 'Key for SecureToken response, used if the server requires SecureToken authent…'
complete -c rtmpgw -l 'jtv		-jJSON' --description 'JSON token used by legacy Justin. tv servers.  Invokes NetStream.'
complete -c rtmpgw -l 'swfhash		-whexstring' --description 'SHA256 hash of the decompressed SWF file.'
complete -c rtmpgw -l 'swfsize		-xnum' --description 'Size of the decompressed SWF file.'
complete -c rtmpgw -l 'swfVfy		-Wurl' --description 'URL of the SWF player for this media.'
complete -c rtmpgw -l 'swfAge		-Xdays' --description 'Specify how many days to use the cached SWF info before re-checking.'
complete -c rtmpgw -l 'device		-Daddress' --description 'Listener IP address.  The default is 0. 0. 0. 0, i. e. , any IP address.'
complete -c rtmpgw -l 'sport		-gport' --description 'Listener port.  The default is 80.'
complete -c rtmpgw -l 'quiet		-q' --description 'Suppress all command output.'
complete -c rtmpgw -l 'verbose		-V' --description 'Verbose command output.'
complete -c rtmpgw -l 'debug		-z' --description 'Debug level output.'
complete -c rtmpgw -l 'rtmp		-r' --description 'URL of the server and media content.'
complete -c rtmpgw -l 'host		-n' --description 'Overrides the hostname in the RTMP URL.'
complete -c rtmpgw -l 'port		-c' --description 'Overrides the port number in the RTMP URL.'
complete -c rtmpgw -l 'protocol	-l' --description 'Overrides the protocol in the RTMP URL.'
complete -c rtmpgw -l 'socks		-S' --description 'Use the specified SOCKS4 proxy.'
complete -c rtmpgw -l 'app		-a' --description 'Name of application to connect to on the RTMP server.'
complete -c rtmpgw -l 'tcUrl		-t' --description 'URL of the target stream.  Defaults to rtmp[e]://host[:port]/app/playpath.'
complete -c rtmpgw -l 'pageUrl		-p' --description 'URL of the web page in which the media was embedded.'
complete -c rtmpgw -l 'swfUrl		-s' --description 'URL of the SWF player for the media.  By default no value will be sent.'
complete -c rtmpgw -l 'flashVer	-f' --description 'Version of the Flash plugin used to run the SWF player.'
complete -c rtmpgw -l 'auth		-u' --description 'An authentication string to be appended to the Connect message.'
complete -c rtmpgw -l conn --description 'option should be used instead.'
complete -c rtmpgw -l 'conn		-C' --description 'Append arbitrary AMF data to the Connect message.'
complete -c rtmpgw -l 'playpath	-y' --description 'Overrides the playpath parsed from the RTMP URL.'
complete -c rtmpgw -l 'subscribe	-d' --description 'Name of live stream to subscribe to.  Defaults to playpath .'
complete -c rtmpgw -l 'start		-A' --description 'Start at num seconds into the stream.  Not valid for live streams.'
complete -c rtmpgw -l 'stop		-B' --description 'Stop at num seconds into the stream.'
complete -c rtmpgw -l 'buffer		-b' --description 'Set buffer time to num milliseconds.  The default is 20000.'
complete -c rtmpgw -l 'timeout		-m' --description 'Timeout the session after num seconds without receiving any data from the ser…'
complete -c rtmpgw -l 'token		-T' --description 'Key for SecureToken response, used if the server requires SecureToken authent…'
complete -c rtmpgw -l 'jtv		-j' --description 'JSON token used by legacy Justin. tv servers.  Invokes NetStream.'
complete -c rtmpgw -l 'swfhash		-w' --description 'SHA256 hash of the decompressed SWF file.'
complete -c rtmpgw -l swfVfy --description 'option below.  The hash is 32 bytes, and must be given in hexadecimal.  The.'
complete -c rtmpgw -l swfsize --description 'option must always be used with this option.'
complete -c rtmpgw -l 'swfsize		-x' --description 'Size of the decompressed SWF file.'
complete -c rtmpgw -l swfhash --description 'option must always be used with this option.'
complete -c rtmpgw -l 'swfVfy		-W' --description 'URL of the SWF player for this media.  This option replaces all three of the.'
complete -c rtmpgw -l swfUrl --description '.'
complete -c rtmpgw -l 'swfAge		-X' --description 'Specify how many days to use the cached SWF info before re-checking.'
complete -c rtmpgw -l 'device		-D' --description 'Listener IP address.  The default is 0. 0. 0. 0, i. e. , any IP address.'
complete -c rtmpgw -l 'sport		-g' --description 'Listener port.  The default is 80.'
complete -c rtmpgw -l 'help		-h' --description 'Print a summary of command options.  EXAMPLES The HTTP request.'

