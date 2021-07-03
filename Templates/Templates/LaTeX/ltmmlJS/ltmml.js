/*
 * I found this document here
 * http://new.math.uiuc.edu/public198/ltmml.css
*/
/*
This Document
=============
ltmml.js and ltmml.css are working copies of products created by 
(C) Jared Schaber and Brent Nelson, U Illinois, 2009/2010 and in this 
form, maintained by George Francis, gfrancis@uiuc.edu (3jun10)
=============
gf 9jan10
Locate unicode table at www.atm.ox.ac.uk by googling "free online unicode character map'
Read 4 nibble uXYZW  with X,Y in table header, Z the row, and W the column
Added a whole slew of math symbols including logic and copyright etc.

LaTeXMathML.js
==============

This file, in this form, is due to Douglas Woodall, June 2006.
It contains JavaScript functions to convert (most simple) LaTeX
math notation to Presentation MathML.  It was obtained by
downloading the file ASCIIMathML.js from
	http://www1.chapman.edu/~jipsen/mathml/asciimathdownload/
and modifying it so that it carries out ONLY those conversions
that would be carried out in LaTeX.  A description of the original
file, with examples, can be found at
	www1.chapman.edu/~jipsen/mathml/asciimath.html
	ASCIIMathML: Math on the web for everyone

Here is the header notice from the original file:

ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
to Presentation MathML. The conversion is done while the (X)HTML page
loads, and should work with Firefox/Mozilla/Netscape 7+ and Internet
Explorer 6+MathPlayer (http://www.dessci.com/en/products/mathplayer/).
Just add the next line to your (X)HTML page with this file in the same folder:
<script type="text/javascript" src="ASCIIMathML.js"></script>
This is a convenient and inexpensive solution for authoring MathML.

Version 1.4.7 Dec 15, 2005, (c) Peter Jipsen http://www.chapman.edu/~jipsen
Latest version at http://www.chapman.edu/~jipsen/mathml/ASCIIMathML.js
For changes see http://www.chapman.edu/~jipsen/mathml/asciimathchanges.txt
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html)
for more details.

LaTeXMathML.js (ctd)
==============

The instructions for use are the same as for the original
ASCIIMathML.js, except that of course the line you add to your
file should be
<script type="text/javascript" src="LaTeXMathML.js"></script>
Or use absolute path names if the file is not in the same folder
as your (X)HTML page.
*/

var checkForMathML = true;   // check if browser can display MathML
var notifyIfNoMathML = true; // display note if no MathML capability
var alertIfNoMathML = false;  // show alert box if no MathML capability
// was "red":
var mathcolor = "";	     // change it to "" (to inherit) or any other color
// was "serif":
var mathfontfamily = "serif";      // change to "" to inherit (works in IE)
                              // or another family (e.g. "arial")
var showasciiformulaonhover = true; // helps students learn ASCIIMath
/*
// Commented out by DRW -- not now used -- see DELIMITERS (twice) near the end
var displaystyle = false;     // puts limits above and below large operators
var decimalsign = ".";        // change to "," if you like, beware of `(1,2)`!
var AMdelimiter1 = "`", AMescape1 = "\\\\`"; // can use other characters
var AMdelimiter2 = "$", AMescape2 = "\\\\\\$", AMdelimiter2regexp = "\\$";
var doubleblankmathdelimiter = false; // if true,  x+1  is equal to `x+1`
                                      // for IE this works only in <!--   -->
//var separatetokens;// has been removed (email me if this is a problem)
*/
var isIE = document.createElementNS==null;

if (document.getElementById==null)
  alert("This webpage requires a recent browser such as \nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer")

// all further global variables start with "AM"

function AMcreateElementXHTML(t) {
  if (isIE) return document.createElement(t);
  else return document.createElementNS("http://www.w3.org/1999/xhtml",t);
}

function AMnoMathMLNote() {
  var nd = AMcreateElementXHTML("h3");
  nd.setAttribute("align","center")
  nd.appendChild(AMcreateElementXHTML("p"));
  nd.appendChild(document.createTextNode("To view the "));
  var an = AMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("LaTeXMathML"));
  an.setAttribute("href","http://www.maths.nott.ac.uk/personal/drw/lm.html");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" notation use Internet Explorer 6+")); 
  an = AMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("MathPlayer"));
  an.setAttribute("href","http://www.dessci.com/en/products/mathplayer/download.htm");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  nd.appendChild(AMcreateElementXHTML("p"));
  return nd;
}

function AMisMathMLavailable() {
  if (navigator.appName.slice(0,8)=="Netscape")
    if (navigator.appVersion.slice(0,1)>="5") return null;
    else return AMnoMathMLNote();
  else if (navigator.appName.slice(0,9)=="Microsoft")
    try {
        var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        return null;
    } catch (e) {
        return AMnoMathMLNote();
    }
  else return AMnoMathMLNote();
}

// character lists for Mozilla/Netscape fonts
var AMcal = [0xEF35,0x212C,0xEF36,0xEF37,0x2130,0x2131,0xEF38,0x210B,0x2110,0xEF39,0xEF3A,0x2112,0x2133,0xEF3B,0xEF3C,0xEF3D,0xEF3E,0x211B,0xEF3F,0xEF40,0xEF41,0xEF42,0xEF43,0xEF44,0xEF45,0xEF46];
var AMfrk = [0xEF5D,0xEF5E,0x212D,0xEF5F,0xEF60,0xEF61,0xEF62,0x210C,0x2111,0xEF63,0xEF64,0xEF65,0xEF66,0xEF67,0xEF68,0xEF69,0xEF6A,0x211C,0xEF6B,0xEF6C,0xEF6D,0xEF6E,0xEF6F,0xEF70,0xEF71,0x2128];
var AMbbb = [0xEF8C,0xEF8D,0x2102,0xEF8E,0xEF8F,0xEF90,0xEF91,0x210D,0xEF92,0xEF93,0xEF94,0xEF95,0xEF96,0x2115,0xEF97,0x2119,0x211A,0x211D,0xEF98,0xEF99,0xEF9A,0xEF9B,0xEF9C,0xEF9D,0xEF9E,0x2124];

var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4,
    RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8,
    TEXT = 9, BIG = 10, LONG = 11, STRETCHY = 12, MATRIX = 13; // token types

var AMsqrt = {input:"\\sqrt",	tag:"msqrt", output:"sqrt",	ttype:UNARY},
  AMroot = {input:"\\root",	tag:"mroot", output:"root",	ttype:BINARY},
  AMfrac = {input:"\\frac",	tag:"mfrac", output:"/",	ttype:BINARY},
  AMover = {input:"\\stackrel", tag:"mover", output:"stackrel", ttype:BINARY},
  AMatop = {input:"\\atop",	tag:"mfrac", output:"",		ttype:INFIX},
  AMchoose = {input:"\\choose", tag:"mfrac", output:"",		ttype:INFIX},
  AMsub  = {input:"_",		tag:"msub",  output:"_",	ttype:INFIX},
  AMsup  = {input:"^",		tag:"msup",  output:"^",	ttype:INFIX},
  AMtext = {input:"\\mathrm",	tag:"mtext", output:"text",	ttype:TEXT},
  AMmbox = {input:"\\mbox",	tag:"mtext", output:"mbox",	ttype:TEXT};

// Commented out by DRW to prevent 1/2 turning into a 2-line fraction
// AMdiv   = {input:"/",	 tag:"mfrac", output:"/",    ttype:INFIX},
// Commented out by DRW so that " prints literally in equations
// AMquote = {input:"\"",	 tag:"mtext", output:"mbox", ttype:TEXT};

var AMsymbols = [
//Greek letters
{input:"\\alpha",	tag:"mi", output:"\u03B1", ttype:CONST},
{input:"\\beta",	tag:"mi", output:"\u03B2", ttype:CONST},
{input:"\\gamma",	tag:"mi", output:"\u03B3", ttype:CONST},
{input:"\\delta",	tag:"mi", output:"\u03B4", ttype:CONST},
{input:"\\epsilon",	tag:"mi", output:"\u03B5", ttype:CONST},
{input:"\\varepsilon",  tag:"mi", output:"\u025B", ttype:CONST},
{input:"\\zeta",	tag:"mi", output:"\u03B6", ttype:CONST},
{input:"\\eta",		tag:"mi", output:"\u03B7", ttype:CONST},
{input:"\\theta",	tag:"mi", output:"\u03B8", ttype:CONST},
{input:"\\vartheta",	tag:"mi", output:"\u03D1", ttype:CONST},
{input:"\\iota",	tag:"mi", output:"\u03B9", ttype:CONST},
{input:"\\kappa",	tag:"mi", output:"\u03BA", ttype:CONST},
{input:"\\lambda",	tag:"mi", output:"\u03BB", ttype:CONST},
{input:"\\mu",		tag:"mi", output:"\u03BC", ttype:CONST},
{input:"\\nu",		tag:"mi", output:"\u03BD", ttype:CONST},
{input:"\\xi",		tag:"mi", output:"\u03BE", ttype:CONST},
{input:"\\pi",		tag:"mi", output:"\u03C0", ttype:CONST},
{input:"\\varpi",	tag:"mi", output:"\u03D6", ttype:CONST},
{input:"\\rho",		tag:"mi", output:"\u03C1", ttype:CONST},
{input:"\\varrho",	tag:"mi", output:"\u03F1", ttype:CONST},
{input:"\\varsigma",	tag:"mi", output:"\u03C2", ttype:CONST},
{input:"\\sigma",	tag:"mi", output:"\u03C3", ttype:CONST},
{input:"\\tau",		tag:"mi", output:"\u03C4", ttype:CONST},
{input:"\\upsilon",	tag:"mi", output:"\u03C5", ttype:CONST},
{input:"\\phi",		tag:"mi", output:"\u03C6", ttype:CONST},
{input:"\\varphi",	tag:"mi", output:"\u03D5", ttype:CONST},
{input:"\\chi",		tag:"mi", output:"\u03C7", ttype:CONST},
{input:"\\psi",		tag:"mi", output:"\u03C8", ttype:CONST},
{input:"\\omega",	tag:"mi", output:"\u03C9", ttype:CONST},
{input:"\\Gamma",	tag:"mo", output:"\u0393", ttype:CONST},
{input:"\\Delta",	tag:"mo", output:"\u0394", ttype:CONST},
{input:"\\Theta",	tag:"mo", output:"\u0398", ttype:CONST},
{input:"\\Lambda",	tag:"mo", output:"\u039B", ttype:CONST},
{input:"\\Xi",		tag:"mo", output:"\u039E", ttype:CONST},
{input:"\\Pi",		tag:"mo", output:"\u03A0", ttype:CONST},
{input:"\\Sigma",	tag:"mo", output:"\u03A3", ttype:CONST},
{input:"\\Upsilon",	tag:"mo", output:"\u03A5", ttype:CONST},
{input:"\\Phi",		tag:"mo", output:"\u03A6", ttype:CONST},
{input:"\\Psi",		tag:"mo", output:"\u03A8", ttype:CONST},
{input:"\\Omega",	tag:"mo", output:"\u03A9", ttype:CONST},

//fractions
{input:"\\frac12",	tag:"mo", output:"\u00BD", ttype:CONST},
{input:"\\frac14",	tag:"mo", output:"\u00BC", ttype:CONST},
{input:"\\frac34",	tag:"mo", output:"\u00BE", ttype:CONST},
{input:"\\frac13",	tag:"mo", output:"\u2153", ttype:CONST},
{input:"\\frac23",	tag:"mo", output:"\u2154", ttype:CONST},
{input:"\\frac15",	tag:"mo", output:"\u2155", ttype:CONST},
{input:"\\frac25",	tag:"mo", output:"\u2156", ttype:CONST},
{input:"\\frac35",	tag:"mo", output:"\u2157", ttype:CONST},
{input:"\\frac45",	tag:"mo", output:"\u2158", ttype:CONST},
{input:"\\frac16",	tag:"mo", output:"\u2159", ttype:CONST},
{input:"\\frac56",	tag:"mo", output:"\u215A", ttype:CONST},
{input:"\\frac18",	tag:"mo", output:"\u215B", ttype:CONST},
{input:"\\frac38",	tag:"mo", output:"\u215C", ttype:CONST},
{input:"\\frac58",	tag:"mo", output:"\u215D", ttype:CONST},
{input:"\\frac78",	tag:"mo", output:"\u215E", ttype:CONST},

//binary operation symbols
{input:"\\pm",		tag:"mo", output:"\u00B1", ttype:CONST},
{input:"\\mp",		tag:"mo", output:"\u2213", ttype:CONST},
{input:"\\triangleleft",tag:"mo", output:"\u22B2", ttype:CONST},
{input:"\\triangleright",tag:"mo",output:"\u22B3", ttype:CONST},
{input:"\\cdot",	tag:"mo", output:"\u22C5", ttype:CONST},
{input:"\\star",	tag:"mo", output:"\u22C6", ttype:CONST},
{input:"\\ast",		tag:"mo", output:"\u002A", ttype:CONST},
{input:"\\S",		tag:"mo", output:"\u00A7", ttype:CONST},
{input:"\\sec",		tag:"mo", output:"\u00A7", ttype:CONST},
{input:"\\P",		tag:"mo", output:"\u00B6", ttype:CONST},
{input:"\\par",		tag:"mo", output:"\u00B6", ttype:CONST},
{input:"\\C",	        tag:"mo", output:"\u00A9", ttype:CONST},
{input:"\\copyright",	tag:"mo", output:"\u00A9", ttype:CONST},
{input:"\\times",	tag:"mo", output:"\u00D7", ttype:CONST},
{input:"\\div",		tag:"mo", output:"\u00F7", ttype:CONST},
{input:"\\circ",	tag:"mo", output:"\u2218", ttype:CONST},
//{input:"\\bullet",	  tag:"mo", output:"\u2219", ttype:CONST},
{input:"\\bullet",	tag:"mo", output:"\u2022", ttype:CONST},
{input:"\\oplus",	tag:"mo", output:"\u2295", ttype:CONST},
{input:"\\ominus",	tag:"mo", output:"\u2296", ttype:CONST},
{input:"\\otimes",	tag:"mo", output:"\u2297", ttype:CONST},
{input:"\\bigcirc",	tag:"mo", output:"\u25CB", ttype:CONST},
{input:"\\oslash",	tag:"mo", output:"\u2298", ttype:CONST},
{input:"\\odot",	tag:"mo", output:"\u2299", ttype:CONST},
{input:"\\land",	tag:"mo", output:"\u2227", ttype:CONST},
{input:"\\wedge",	tag:"mo", output:"\u2227", ttype:CONST},
{input:"\\and",	tag:"mo", output:"\u2227", ttype:CONST},
{input:"\\lor",		tag:"mo", output:"\u2228", ttype:CONST},
{input:"\\vee",		tag:"mo", output:"\u2228", ttype:CONST},
{input:"\\or",		tag:"mo", output:"\u2228", ttype:CONST},
{input:"\\cap",		tag:"mo", output:"\u2229", ttype:CONST},
{input:"\\cup",		tag:"mo", output:"\u222A", ttype:CONST},
{input:"\\sqcap",	tag:"mo", output:"\u2293", ttype:CONST},
{input:"\\sqcup",	tag:"mo", output:"\u2294", ttype:CONST},
{input:"\\uplus",	tag:"mo", output:"\u228E", ttype:CONST},
{input:"\\amalg",	tag:"mo", output:"\u2210", ttype:CONST},
{input:"\\bigtriangleup",tag:"mo",output:"\u25B3", ttype:CONST},
{input:"\\bigtriangledown",tag:"mo",output:"\u25BD", ttype:CONST},
{input:"\\dag",		tag:"mo", output:"\u2020", ttype:CONST},
{input:"\\dagger",	tag:"mo", output:"\u2020", ttype:CONST},
{input:"\\ddag",	tag:"mo", output:"\u2021", ttype:CONST},
{input:"\\ddagger",	tag:"mo", output:"\u2021", ttype:CONST},
{input:"\\lhd",		tag:"mo", output:"\u22B2", ttype:CONST},
{input:"\\rhd",		tag:"mo", output:"\u22B3", ttype:CONST},
{input:"\\unlhd",	tag:"mo", output:"\u22B4", ttype:CONST},
{input:"\\unrhd",	tag:"mo", output:"\u22B5", ttype:CONST},


//BIG Operators
{input:"\\sum",		tag:"mo", output:"\u2211", ttype:UNDEROVER},
{input:"\\prod",	tag:"mo", output:"\u220F", ttype:UNDEROVER},
{input:"\\bigcap",	tag:"mo", output:"\u22C2", ttype:UNDEROVER},
{input:"\\bigcup",	tag:"mo", output:"\u22C3", ttype:UNDEROVER},
{input:"\\bigwedge",	tag:"mo", output:"\u22C0", ttype:UNDEROVER},
{input:"\\bigvee",	tag:"mo", output:"\u22C1", ttype:UNDEROVER},
{input:"\\bigsqcap",	tag:"mo", output:"\u2A05", ttype:UNDEROVER},
{input:"\\bigsqcup",	tag:"mo", output:"\u2A06", ttype:UNDEROVER},
{input:"\\coprod",	tag:"mo", output:"\u2210", ttype:UNDEROVER},
{input:"\\bigoplus",	tag:"mo", output:"\u2A01", ttype:UNDEROVER},
{input:"\\bigotimes",	tag:"mo", output:"\u2A02", ttype:UNDEROVER},
{input:"\\bigodot",	tag:"mo", output:"\u2A00", ttype:UNDEROVER},
{input:"\\biguplus",	tag:"mo", output:"\u2A04", ttype:UNDEROVER},
{input:"\\int",		tag:"mo", output:"\u222B", ttype:CONST},
{input:"\\oint",	tag:"mo", output:"\u222E", ttype:CONST},

//binary relation symbols
{input:":=",		tag:"mo", output:":=",	   ttype:CONST},
{input:"\\lt",		tag:"mo", output:"<",	   ttype:CONST},
{input:"\\gt",		tag:"mo", output:">",	   ttype:CONST},
{input:"\\ne",		tag:"mo", output:"\u2260", ttype:CONST},
{input:"\\neq",		tag:"mo", output:"\u2260", ttype:CONST},
{input:"\\le",		tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\leq",		tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\leqslant",	tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\ge",		tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\geq",		tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\geqslant",	tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\equiv",	tag:"mo", output:"\u2261", ttype:CONST},
{input:"\\ll",		tag:"mo", output:"\u226A", ttype:CONST},
{input:"\\gg",		tag:"mo", output:"\u226B", ttype:CONST},
{input:"\\doteq",	tag:"mo", output:"\u2250", ttype:CONST},
{input:"\\prec",	tag:"mo", output:"\u227A", ttype:CONST},
{input:"\\succ",	tag:"mo", output:"\u227B", ttype:CONST},
{input:"\\preceq",	tag:"mo", output:"\u227C", ttype:CONST},
{input:"\\succeq",	tag:"mo", output:"\u227D", ttype:CONST},
{input:"\\subset",	tag:"mo", output:"\u2282", ttype:CONST},
{input:"\\supset",	tag:"mo", output:"\u2283", ttype:CONST},
{input:"\\subseteq",	tag:"mo", output:"\u2286", ttype:CONST},
{input:"\\supseteq",	tag:"mo", output:"\u2287", ttype:CONST},
{input:"\\sqsubset",	tag:"mo", output:"\u228F", ttype:CONST},
{input:"\\sqsupset",	tag:"mo", output:"\u2290", ttype:CONST},
{input:"\\sqsubseteq",  tag:"mo", output:"\u2291", ttype:CONST},
{input:"\\sqsupseteq",  tag:"mo", output:"\u2292", ttype:CONST},
{input:"\\sim",		tag:"mo", output:"\u223C", ttype:CONST},
{input:"\\simeq",	tag:"mo", output:"\u2243", ttype:CONST},
{input:"\\approx",	tag:"mo", output:"\u2248", ttype:CONST},
{input:"\\cong",	tag:"mo", output:"\u2245", ttype:CONST},
{input:"\\Join",	tag:"mo", output:"\u22C8", ttype:CONST},
{input:"\\bowtie",	tag:"mo", output:"\u22C8", ttype:CONST},
{input:"\\in",		tag:"mo", output:"\u2208", ttype:CONST},
{input:"\\ni",		tag:"mo", output:"\u220B", ttype:CONST},
{input:"\\owns",	tag:"mo", output:"\u220B", ttype:CONST},
{input:"\\propto",	tag:"mo", output:"\u221D", ttype:CONST},
{input:"\\vdash",	tag:"mo", output:"\u22A2", ttype:CONST},
{input:"\\dashv",	tag:"mo", output:"\u22A3", ttype:CONST},
{input:"\\models",	tag:"mo", output:"\u22A8", ttype:CONST},
{input:"\\perp",	tag:"mo", output:"\u22A5", ttype:CONST},
{input:"\\smile",	tag:"mo", output:"\u2323", ttype:CONST},
{input:"\\frown",	tag:"mo", output:"\u2322", ttype:CONST},
{input:"\\asymp",	tag:"mo", output:"\u224D", ttype:CONST},
{input:"\\notin",	tag:"mo", output:"\u2209", ttype:CONST},

//matrices
{input:"\\begin{eqnarray}",	output:"X",	ttype:MATRIX, invisible:true},
{input:"\\begin{array}",	output:"X",	ttype:MATRIX, invisible:true},
{input:"\\\\",			output:"}&{",	ttype:DEFINITION},
{input:"\\end{eqnarray}",	output:"}}",	ttype:DEFINITION},
{input:"\\end{array}",		output:"}}",	ttype:DEFINITION},

//grouping and literal brackets -- ieval is for IE
{input:"\\big",	   tag:"mo", output:"X", atval:"1.2", ieval:"2.2", ttype:BIG},
{input:"\\Big",	   tag:"mo", output:"X", atval:"1.6", ieval:"2.6", ttype:BIG},
{input:"\\bigg",   tag:"mo", output:"X", atval:"2.2", ieval:"3.2", ttype:BIG},
{input:"\\Bigg",   tag:"mo", output:"X", atval:"2.9", ieval:"3.9", ttype:BIG},
{input:"\\left",   tag:"mo", output:"X", ttype:LEFTBRACKET},
{input:"\\right",  tag:"mo", output:"X", ttype:RIGHTBRACKET},
{input:"{",	   output:"{", ttype:LEFTBRACKET,  invisible:true},
{input:"}",	   output:"}", ttype:RIGHTBRACKET, invisible:true},

{input:"(",	   tag:"mo", output:"(",      atval:"1", ttype:STRETCHY},
{input:"[",	   tag:"mo", output:"[",      atval:"1", ttype:STRETCHY},
{input:"\\lbrack", tag:"mo", output:"[",      atval:"1", ttype:STRETCHY},
{input:"\\{",	   tag:"mo", output:"{",      atval:"1", ttype:STRETCHY},
{input:"\\lbrace", tag:"mo", output:"{",      atval:"1", ttype:STRETCHY},
{input:"\\langle", tag:"mo", output:"\u2329", atval:"1", ttype:STRETCHY},
{input:"\\lfloor", tag:"mo", output:"\u230A", atval:"1", ttype:STRETCHY},
{input:"\\lceil",  tag:"mo", output:"\u2308", atval:"1", ttype:STRETCHY},

// rtag:"mi" causes space to be inserted before a following sin, cos, etc.
// (see function AMparseExpr() )
{input:")",	  tag:"mo",output:")",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"]",	  tag:"mo",output:"]",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rbrack",tag:"mo",output:"]",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\}",	  tag:"mo",output:"}",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rbrace",tag:"mo",output:"}",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rangle",tag:"mo",output:"\u232A", rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rfloor",tag:"mo",output:"\u230B", rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rceil", tag:"mo",output:"\u2309", rtag:"mi",atval:"1",ttype:STRETCHY},

// "|", "\\|", "\\vert" and "\\Vert" modified later: lspace = rspace = 0em
{input:"|",		tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\|",		tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"\\vert",	tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\Vert",	tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"\\mid",		tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\parallel",	tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"/",		tag:"mo", output:"/",	atval:"1.01", ttype:STRETCHY},
{input:"\\backslash",	tag:"mo", output:"\u2216", atval:"1", ttype:STRETCHY},
{input:"\\setminus",	tag:"mo", output:"\\",	   ttype:CONST},

//miscellaneous symbols
{input:"\\!",	  tag:"mspace", atname:"width", atval:"-0.167em", ttype:SPACE},
{input:"\\,",	  tag:"mspace", atname:"width", atval:"0.167em", ttype:SPACE},
{input:"\\>",	  tag:"mspace", atname:"width", atval:"0.222em", ttype:SPACE},
{input:"\\:",	  tag:"mspace", atname:"width", atval:"0.222em", ttype:SPACE},
{input:"\\;",	  tag:"mspace", atname:"width", atval:"0.278em", ttype:SPACE},
{input:"~",	  tag:"mspace", atname:"width", atval:"0.333em", ttype:SPACE},
{input:"\\quad",  tag:"mspace", atname:"width", atval:"1em", ttype:SPACE},
{input:"\\qquad", tag:"mspace", atname:"width", atval:"2em", ttype:SPACE},
//{input:"{}",		  tag:"mo", output:"\u200B", ttype:CONST}, // zero-width
{input:"\\prime",	tag:"mo", output:"\u2032", ttype:CONST},
{input:"'",		tag:"mo", output:"\u02B9", ttype:CONST},
{input:"''",		tag:"mo", output:"\u02BA", ttype:CONST},
{input:"'''",		tag:"mo", output:"\u2034", ttype:CONST},
{input:"''''",		tag:"mo", output:"\u2057", ttype:CONST},
{input:"\\ldots",	tag:"mo", output:"\u2026", ttype:CONST},
{input:"\\cdots",	tag:"mo", output:"\u22EF", ttype:CONST},
{input:"\\vdots",	tag:"mo", output:"\u22EE", ttype:CONST},
{input:"\\ddots",	tag:"mo", output:"\u22F1", ttype:CONST},
{input:"\\forall",	tag:"mo", output:"\u2200", ttype:CONST},
{input:"\\exists",	tag:"mo", output:"\u2203", ttype:CONST},
{input:"\\Re",		tag:"mo", output:"\u211C", ttype:CONST},
{input:"\\Im",		tag:"mo", output:"\u2111", ttype:CONST},
{input:"\\aleph",	tag:"mo", output:"\u2135", ttype:CONST},
{input:"\\hbar",	tag:"mo", output:"\u210F", ttype:CONST},
{input:"\\ell",		tag:"mo", output:"\u2113", ttype:CONST},
{input:"\\wp",		tag:"mo", output:"\u2118", ttype:CONST},
{input:"\\emptyset",	tag:"mo", output:"\u2205", ttype:CONST},
{input:"\\infty",	tag:"mo", output:"\u221E", ttype:CONST},
{input:"\\surd",	tag:"mo", output:"\\sqrt{}", ttype:DEFINITION},
{input:"\\partial",	tag:"mo", output:"\u2202", ttype:CONST},
{input:"\\nabla",	tag:"mo", output:"\u2207", ttype:CONST},
{input:"\\triangle",	tag:"mo", output:"\u25B3", ttype:CONST},
{input:"\\therefore",	tag:"mo", output:"\u2234", ttype:CONST},
{input:"\\angle",	tag:"mo", output:"\u2220", ttype:CONST},
//{input:"\\\\ ",	  tag:"mo", output:"\u00A0", ttype:CONST},
{input:"\\diamond",	tag:"mo", output:"\u22C4", ttype:CONST},
//{input:"\\Diamond",	  tag:"mo", output:"\u25CA", ttype:CONST},
{input:"\\Diamond",	tag:"mo", output:"\u25C7", ttype:CONST},
{input:"\\neg",		tag:"mo", output:"\u00AC", ttype:CONST},
{input:"\\lnot",	tag:"mo", output:"\u00AC", ttype:CONST},
{input:"\\bot",		tag:"mo", output:"\u22A5", ttype:CONST},
{input:"\\top",		tag:"mo", output:"\u22A4", ttype:CONST},
{input:"\\square",	tag:"mo", output:"\u25AB", ttype:CONST},
{input:"\\Box",		tag:"mo", output:"\u25A1", ttype:CONST},
{input:"\\wr",		tag:"mo", output:"\u2240", ttype:CONST},

//standard functions
//Note UNDEROVER *must* have tag:"mo" to work properly
{input:"\\arccos", tag:"mi", output:"arccos", ttype:UNARY, func:true},
{input:"\\arcsin", tag:"mi", output:"arcsin", ttype:UNARY, func:true},
{input:"\\arctan", tag:"mi", output:"arctan", ttype:UNARY, func:true},
{input:"\\arg",	   tag:"mi", output:"arg",    ttype:UNARY, func:true},
{input:"\\cos",	   tag:"mi", output:"cos",    ttype:UNARY, func:true},
{input:"\\cosh",   tag:"mi", output:"cosh",   ttype:UNARY, func:true},
{input:"\\cot",	   tag:"mi", output:"cot",    ttype:UNARY, func:true},
{input:"\\coth",   tag:"mi", output:"coth",   ttype:UNARY, func:true},
{input:"\\csc",	   tag:"mi", output:"csc",    ttype:UNARY, func:true},
{input:"\\deg",	   tag:"mi", output:"deg",    ttype:UNARY, func:true},
{input:"\\det",	   tag:"mi", output:"det",    ttype:UNARY, func:true},
{input:"\\dim",	   tag:"mi", output:"dim",    ttype:UNARY, func:true}, //CONST?
{input:"\\exp",	   tag:"mi", output:"exp",    ttype:UNARY, func:true},
{input:"\\gcd",	   tag:"mi", output:"gcd",    ttype:UNARY, func:true}, //CONST?
{input:"\\hom",	   tag:"mi", output:"hom",    ttype:UNARY, func:true},
{input:"\\inf",	      tag:"mo", output:"inf",	 ttype:UNDEROVER},
{input:"\\ker",	   tag:"mi", output:"ker",    ttype:UNARY, func:true},
{input:"\\lg",	   tag:"mi", output:"lg",     ttype:UNARY, func:true},
{input:"\\lim",	      tag:"mo", output:"lim",	 ttype:UNDEROVER},
{input:"\\liminf",    tag:"mo", output:"liminf", ttype:UNDEROVER},
{input:"\\limsup",    tag:"mo", output:"limsup", ttype:UNDEROVER},
{input:"\\ln",	   tag:"mi", output:"ln",     ttype:UNARY, func:true},
{input:"\\log",	   tag:"mi", output:"log",    ttype:UNARY, func:true},
{input:"\\max",	      tag:"mo", output:"max",	 ttype:UNDEROVER},
{input:"\\min",	      tag:"mo", output:"min",	 ttype:UNDEROVER},
{input:"\\Pr",	   tag:"mi", output:"Pr",     ttype:UNARY, func:true},
{input:"\\sec",	   tag:"mi", output:"sec",    ttype:UNARY, func:true},
{input:"\\sin",	   tag:"mi", output:"sin",    ttype:UNARY, func:true},
{input:"\\sinh",   tag:"mi", output:"sinh",   ttype:UNARY, func:true},
{input:"\\sup",	      tag:"mo", output:"sup",	 ttype:UNDEROVER},
{input:"\\tan",	   tag:"mi", output:"tan",    ttype:UNARY, func:true},
{input:"\\tanh",   tag:"mi", output:"tanh",   ttype:UNARY, func:true},

//arrows
{input:"\\gets",		tag:"mo", output:"\u2190", ttype:CONST},
{input:"\\leftarrow",		tag:"mo", output:"\u2190", ttype:CONST},
{input:"\\to",			tag:"mo", output:"\u2192", ttype:CONST},
{input:"\\rightarrow",		tag:"mo", output:"\u2192", ttype:CONST},
{input:"\\leftrightarrow",	tag:"mo", output:"\u2194", ttype:CONST},
{input:"\\uparrow",		tag:"mo", output:"\u2191", ttype:CONST},
{input:"\\downarrow",		tag:"mo", output:"\u2193", ttype:CONST},
{input:"\\updownarrow",		tag:"mo", output:"\u2195", ttype:CONST},
{input:"\\Leftarrow",		tag:"mo", output:"\u21D0", ttype:CONST},
{input:"\\Rightarrow",		tag:"mo", output:"\u21D2", ttype:CONST},
{input:"\\implies",		tag:"mo", output:"\u21D2", ttype:CONST},
{input:"\\Leftrightarrow",	tag:"mo", output:"\u21D4", ttype:CONST},
{input:"\\if",	                tag:"mo", output:"\u21D4", ttype:CONST},
{input:"\\iff", tag:"mo", output:"~\\Longleftrightarrow~", ttype:DEFINITION},
{input:"\\Uparrow",		tag:"mo", output:"\u21D1", ttype:CONST},
{input:"\\Downarrow",		tag:"mo", output:"\u21D3", ttype:CONST},
{input:"\\Updownarrow",		tag:"mo", output:"\u21D5", ttype:CONST},
{input:"\\mapsto",		tag:"mo", output:"\u21A6", ttype:CONST},
{input:"\\longleftarrow",	tag:"mo", output:"\u2190", ttype:LONG},
{input:"\\longrightarrow",	tag:"mo", output:"\u2192", ttype:LONG},
{input:"\\longleftrightarrow",	tag:"mo", output:"\u2194", ttype:LONG},
{input:"\\Longleftarrow",	tag:"mo", output:"\u21D0", ttype:LONG},
{input:"\\Longrightarrow",	tag:"mo", output:"\u21D2", ttype:LONG},
{input:"\\Longleftrightarrow",  tag:"mo", output:"\u21D4", ttype:LONG},
{input:"\\longmapsto",		tag:"mo", output:"\u21A6", ttype:CONST},
							// disaster if LONG

//commands with argument
AMsqrt, AMroot, AMfrac, AMover, AMsub, AMsup, AMtext, AMmbox, AMatop, AMchoose,
//AMdiv, AMquote,

//diacritical marks
{input:"\\acute",	tag:"mover",  output:"\u00B4", ttype:UNARY, acc:true},
//{input:"\\acute",	  tag:"mover",  output:"\u0317", ttype:UNARY, acc:true},
//{input:"\\acute",	  tag:"mover",  output:"\u0301", ttype:UNARY, acc:true},
//{input:"\\grave",	  tag:"mover",  output:"\u0300", ttype:UNARY, acc:true},
//{input:"\\grave",	  tag:"mover",  output:"\u0316", ttype:UNARY, acc:true},
{input:"\\grave",	tag:"mover",  output:"\u0060", ttype:UNARY, acc:true},
{input:"\\breve",	tag:"mover",  output:"\u02D8", ttype:UNARY, acc:true},
{input:"\\check",	tag:"mover",  output:"\u02C7", ttype:UNARY, acc:true},
{input:"\\dot",		tag:"mover",  output:".",      ttype:UNARY, acc:true},
{input:"\\ddot",	tag:"mover",  output:"..",     ttype:UNARY, acc:true},
//{input:"\\ddot",	  tag:"mover",  output:"\u00A8", ttype:UNARY, acc:true},
{input:"\\mathring",	tag:"mover",  output:"\u00B0", ttype:UNARY, acc:true},
{input:"\\vec",		tag:"mover",  output:"\u20D7", ttype:UNARY, acc:true},
{input:"\\overrightarrow",tag:"mover",output:"\u20D7", ttype:UNARY, acc:true},
{input:"\\overleftarrow",tag:"mover", output:"\u20D6", ttype:UNARY, acc:true},
{input:"\\hat",		tag:"mover",  output:"\u005E", ttype:UNARY, acc:true},
{input:"\\widehat",	tag:"mover",  output:"\u0302", ttype:UNARY, acc:true},
{input:"\\tilde",	tag:"mover",  output:"~",      ttype:UNARY, acc:true},
//{input:"\\tilde",	  tag:"mover",  output:"\u0303", ttype:UNARY, acc:true},
{input:"\\widetilde",	tag:"mover",  output:"\u02DC", ttype:UNARY, acc:true},
{input:"\\bar",		tag:"mover",  output:"\u203E", ttype:UNARY, acc:true},
{input:"\\overbrace",	tag:"mover",  output:"\uFE37", ttype:UNARY, acc:true}, //Changed unicode overbrace
{input:"\\overbracket", tag:"mover",  output:"\u23B4", ttype:UNARY, acc:true}, //old overbrace = overbracket
{input:"\\overline",	tag:"mover",  output:"\u00AF", ttype:UNARY, acc:true},
{input:"\\underbrace",  tag:"munder", output:"\uFE38", ttype:UNARY, acc:true}, //Changed unicode underbrace
{input:"\\underbracket",tag:"munder", output:"\u23B5", ttype:UNARY, acc:true}, //old underbrace = underbracket
{input:"\\underline",	tag:"munder", output:"\u00AF", ttype:UNARY, acc:true},
//{input:"underline",	tag:"munder", output:"\u0332", ttype:UNARY, acc:true},

//typestyles and fonts
{input:"\\displaystyle",tag:"mstyle",atname:"displaystyle",atval:"true", ttype:UNARY},
{input:"\\textstyle",tag:"mstyle",atname:"displaystyle",atval:"false", ttype:UNARY},
{input:"\\scriptstyle",tag:"mstyle",atname:"scriptlevel",atval:"1", ttype:UNARY},
{input:"\\scriptscriptstyle",tag:"mstyle",atname:"scriptlevel",atval:"2", ttype:UNARY},
{input:"\\textrm", tag:"mstyle", output:"\\mathrm", ttype: DEFINITION},
{input:"\\mathbf", tag:"mstyle", atname:"mathvariant", atval:"bold", ttype:UNARY},
{input:"\\textbf", tag:"mstyle", atname:"mathvariant", atval:"bold", ttype:UNARY},
{input:"\\mathit", tag:"mstyle", atname:"mathvariant", atval:"italic", ttype:UNARY},
{input:"\\textit", tag:"mstyle", atname:"mathvariant", atval:"italic", ttype:UNARY},
{input:"\\mathtt", tag:"mstyle", atname:"mathvariant", atval:"monospace", ttype:UNARY},
{input:"\\texttt", tag:"mstyle", atname:"mathvariant", atval:"monospace", ttype:UNARY},
{input:"\\mathsf", tag:"mstyle", atname:"mathvariant", atval:"sans-serif", ttype:UNARY},
{input:"\\mathbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", ttype:UNARY, codes:AMbbb},
{input:"\\mathcal",tag:"mstyle", atname:"mathvariant", atval:"script", ttype:UNARY, codes:AMcal},
{input:"\\mathfrak",tag:"mstyle",atname:"mathvariant", atval:"fraktur",ttype:UNARY, codes:AMfrk},
{input:"\\textcolor",tag:"mstyle",atname:"mathvariant", atval:"mathcolor", ttype:BINARY},
{input:"\\colorbox",tag:"mstyle",atname:"mathvariant", atval:"background", ttype:BINARY}
]; 

function compareNames(s1,s2) {
  if (s1.input > s2.input) return 1
  else return -1;
}

var AMnames = []; //list of input symbols

function AMinitSymbols() {
  AMsymbols.sort(compareNames);
  for (i=0; i<AMsymbols.length; i++) AMnames[i] = AMsymbols[i].input;
}

var AMmathml = "http://www.w3.org/1998/Math/MathML";

function AMcreateElementMathML(t) {
  if (isIE) return document.createElement("m:"+t);
  else return document.createElementNS(AMmathml,t);
}

function AMcreateMmlNode(t,frag) {
//  var node = AMcreateElementMathML(name);
  if (isIE) var node = document.createElement("m:"+t);
  else var node = document.createElementNS(AMmathml,t);
  node.appendChild(frag);
  return node;
}

function newcommand(oldstr,newstr) {
  AMsymbols = AMsymbols.concat([{input:oldstr, tag:"mo", output:newstr,
                                 ttype:DEFINITION}]);
}

function AMremoveCharsAndBlanks(str,n) {
//remove n characters and any following blanks
  var st;
  st = str.slice(n);
  for (var i=0; i<st.length && st.charCodeAt(i)<=32; i=i+1);
  return st.slice(i);
}

function AMposition(arr, str, n) {
// return position >=n where str appears or would be inserted
// assumes arr is sorted
  if (n==0) {
    var h,m;
    n = -1;
    h = arr.length;
    while (n+1<h) {
      m = (n+h) >> 1;
      if (arr[m]<str) n = m; else h = m;
    }
    return h;
  } else
    for (var i=n; i<arr.length && arr[i]<str; i++);
  return i; // i=arr.length || arr[i]>=str
}

function AMgetSymbol(str) {
//return maximal initial substring of str that appears in names
//return null if there is none
  var k = 0; //new pos
  var j = 0; //old pos
  var mk; //match pos
  var st;
  var tagst;
  var match = "";
  var more = true;
  for (var i=1; i<=str.length && more; i++) {
    st = str.slice(0,i); //initial substring of length i
    j = k;
    k = AMposition(AMnames, st, j);
    if (k<AMnames.length && str.slice(0,AMnames[k].length)==AMnames[k]){
      match = AMnames[k];
      mk = k;
      i = match.length;
    }
    more = k<AMnames.length && str.slice(0,AMnames[k].length)>=AMnames[k];
  }
  AMpreviousSymbol=AMcurrentSymbol;
  if (match!=""){
    AMcurrentSymbol=AMsymbols[mk].ttype;
    return AMsymbols[mk];
  }
  AMcurrentSymbol=CONST;
  k = 1;
  st = str.slice(0,1); //take 1 character
  if ("0"<=st && st<="9") tagst = "mn";
  else tagst = (("A">st || st>"Z") && ("a">st || st>"z")?"mo":"mi");
/*
// Commented out by DRW (not fully understood, but probably to do with
// use of "/" as an INFIX version of "\\frac", which we don't want):
//}
//if (st=="-" && AMpreviousSymbol==INFIX) {
//  AMcurrentSymbol = INFIX;  //trick "/" into recognizing "-" on second parse
//  return {input:st, tag:tagst, output:st, ttype:UNARY, func:true};
//}
*/
  return {input:st, tag:tagst, output:st, ttype:CONST};
}


/*Parsing ASCII math expressions with the following grammar
v ::= [A-Za-z] | greek letters | numbers | other constant symbols
u ::= sqrt | text | bb | other unary symbols for font commands
b ::= frac | root | stackrel	binary symbols
l ::= { | \left			left brackets
r ::= } | \right		right brackets
S ::= v | lEr | uS | bSS	Simple expression
I ::= S_S | S^S | S_S^S | S	Intermediate expression
E ::= IE | I/I			Expression
Each terminal symbol is translated into a corresponding mathml node.*/

var AMpreviousSymbol,AMcurrentSymbol;

function AMparseSexpr(str) { //parses str and returns [node,tailstr,(node)tag]
  var symbol, node, result, result2, i, st,// rightvert = false,
    newFrag = document.createDocumentFragment();
  str = AMremoveCharsAndBlanks(str,0);
  symbol = AMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET)
    return [null,str,null];
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+AMremoveCharsAndBlanks(str,symbol.input.length);
    symbol = AMgetSymbol(str);
    if (symbol == null || symbol.ttype == RIGHTBRACKET)
      return [null,str,null];
  }
  str = AMremoveCharsAndBlanks(str,symbol.input.length);
  switch (symbol.ttype) {
  case SPACE:
    node = AMcreateElementMathML(symbol.tag);
    node.setAttribute(symbol.atname,symbol.atval);
    return [node,str,symbol.tag];
  case UNDEROVER:
    if (isIE) {
      if (symbol.input.substr(0,4) == "\\big") {   // botch for missing symbols
	str = "\\"+symbol.input.substr(4)+str;	   // make \bigcup = \cup etc.
	symbol = AMgetSymbol(str);
	symbol.ttype = UNDEROVER;
	str = AMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    return [AMcreateMmlNode(symbol.tag,
			document.createTextNode(symbol.output)),str,symbol.tag];
  case CONST:
    var output = symbol.output;
    if (isIE) {
      if (symbol.input == "'")
	output = "\u2032";
      else if (symbol.input == "''")
	output = "\u2033";
      else if (symbol.input == "'''")
	output = "\u2033\u2032";
      else if (symbol.input == "''''")
	output = "\u2033\u2033";
      else if (symbol.input == "\\square")
	output = "\u25A1";	// same as \Box
      else if (symbol.input.substr(0,5) == "\\frac") {
						// botch for missing fractions
	var denom = symbol.input.substr(6,1);
	if (denom == "5" || denom == "6") {
	  str = symbol.input.replace(/\\frac/,"\\frac ")+str;
	  return [node,str,symbol.tag];
	}
      }
    }
    node = AMcreateMmlNode(symbol.tag,document.createTextNode(output));
    return [node,str,symbol.tag];
  case LONG:  // added by DRW
    node = AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    node.setAttribute("minsize","1.5");
    node.setAttribute("maxsize","1.5");
    node = AMcreateMmlNode("mover",node);
    node.appendChild(AMcreateElementMathML("mspace"));
    return [node,str,symbol.tag];
  case STRETCHY:  // added by DRW
    if (isIE && symbol.input == "\\backslash")
	symbol.output = "\\";	// doesn't expand, but then nor does "\u2216"
    node = AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (symbol.input == "|" || symbol.input == "\\vert" ||
	symbol.input == "\\|" || symbol.input == "\\Vert") {
	  node.setAttribute("lspace","0em");
	  node.setAttribute("rspace","0em");
    }
    node.setAttribute("maxsize",symbol.atval);  // don't allow to stretch here
    if (symbol.rtag != null)
      return [node,str,symbol.rtag];
    else
      return [node,str,symbol.tag];
  case BIG:  // added by DRW
    var atval = symbol.atval;
    if (isIE)
      atval = symbol.ieval;
    symbol = AMgetSymbol(str);
    if (symbol == null)
	return [null,str,null];
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    node = AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (isIE) {		// to get brackets to expand
      var space = AMcreateElementMathML("mspace");
      space.setAttribute("height",atval+"ex");
      node = AMcreateMmlNode("mrow",node);
      node.appendChild(space);
    } else {		// ignored in IE
      node.setAttribute("minsize",atval);
      node.setAttribute("maxsize",atval);
    }
    return [node,str,symbol.tag];
  case LEFTBRACKET:   //read (expr+)
    if (symbol.input == "\\left") { // left what?
      symbol = AMgetSymbol(str);
      if (symbol != null) {
	if (symbol.input == ".")
	  symbol.invisible = true;
	str = AMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    result = AMparseExpr(str,true,false);
    if (symbol==null ||
	(typeof symbol.invisible == "boolean" && symbol.invisible))
      node = AMcreateMmlNode("mrow",result[0]);
    else {
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = AMcreateMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1],result[2]];
  case MATRIX:	 //read (expr+)
    if (symbol.input == "\\begin{array}") {
      var mask = "";
      symbol = AMgetSymbol(str);
      str = AMremoveCharsAndBlanks(str,0);
      if (symbol == null)
	mask = "l";
      else {
	str = AMremoveCharsAndBlanks(str,symbol.input.length);
	if (symbol.input != "{")
	  mask = "l";
	else do {
	  symbol = AMgetSymbol(str);
	  if (symbol != null) {
	    str = AMremoveCharsAndBlanks(str,symbol.input.length);
	    if (symbol.input != "}")
	      mask = mask+symbol.input;
	  }
	} while (symbol != null && symbol.input != "" && symbol.input != "}");
      }
      result = AMparseExpr("{"+str,true,true);
//    if (result[0]==null) return [AMcreateMmlNode("mo",
//			   document.createTextNode(symbol.input)),str];
      node = AMcreateMmlNode("mtable",result[0]);
      mask = mask.replace(/l/g,"left ");
      mask = mask.replace(/r/g,"right ");
      mask = mask.replace(/c/g,"center ");
      node.setAttribute("columnalign",mask);
      node.setAttribute("displaystyle","false");
      if (isIE)
	return [node,result[1],null];
// trying to get a *little* bit of space around the array
// (IE already includes it)
      var lspace = AMcreateElementMathML("mspace");
      lspace.setAttribute("width","0.167em");
      var rspace = AMcreateElementMathML("mspace");
      rspace.setAttribute("width","0.167em");
      var node1 = AMcreateMmlNode("mrow",lspace);
      node1.appendChild(node);
      node1.appendChild(rspace);
      return [node1,result[1],null];
    } else {	// eqnarray
      result = AMparseExpr("{"+str,true,true);
      node = AMcreateMmlNode("mtable",result[0]);
      if (isIE)
	node.setAttribute("columnspacing","0.25em"); // best in practice?
      else
	node.setAttribute("columnspacing","0.167em"); // correct (but ignored?)
      node.setAttribute("columnalign","right center left");
      node.setAttribute("displaystyle","true");
      node = AMcreateMmlNode("mrow",node);
      return [node,result[1],null];
    }
  case TEXT:
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else i = 0;
      if (i==-1)
		 i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
	node = AMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      newFrag.appendChild(
        AMcreateMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
	node = AMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      str = AMremoveCharsAndBlanks(str,i+1);
      return [AMcreateMmlNode("mrow",newFrag),str,null];
  case UNARY:
      result = AMparseSexpr(str);
      if (result[0]==null) return [AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)),str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
		st = str.charAt(0);
//		if (st=="^" || st=="_" || st=="/" || st=="|" || st==",") {
		if (st=="^" || st=="_" || st==",") {
		  return [AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)),str,symbol.tag];
        } else {
		  node = AMcreateMmlNode("mrow",AMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)));
	  	  if (isIE) {
	        var space = AMcreateElementMathML("mspace");
	    	space.setAttribute("width","0.167em");
	    	node.appendChild(space);
	  	  }
	  	  node.appendChild(result[0]);
	  	  return [node,result[1],symbol.tag];
        }
      }
      if (symbol.input == "\\sqrt") {		// sqrt
	     if (isIE) {	// set minsize, for \surd
	        var space = AMcreateElementMathML("mspace");
	        space.setAttribute("height","1.2ex");
	        space.setAttribute("width","0em");	// probably no effect
	        node = AMcreateMmlNode(symbol.tag,result[0])
//	        node.setAttribute("minsize","1");	// ignored
//         	node = AMcreateMmlNode("mrow",node);  // hopefully unnecessary
	  		node.appendChild(space);
	  		return [node,result[1],symbol.tag];
		} else
		  return [AMcreateMmlNode(symbol.tag,result[0]),result[1],symbol.tag];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
  	      node = AMcreateMmlNode(symbol.tag,result[0]);
	      var output = symbol.output;
		  if (isIE) {
			if (symbol.input == "\\hat")
				output = "\u0302";
			else if (symbol.input == "\\widehat")
				output = "\u005E";
			else if (symbol.input == "\\bar")
				output = "\u00AF";
			else if (symbol.input == "\\grave")
				output = "\u0300";
			else if (symbol.input == "\\tilde")
				output = "\u0303";
		}
		var node1 = AMcreateMmlNode("mo",document.createTextNode(output));
		if (symbol.input == "\\vec" || symbol.input == "\\check")
						// don't allow to stretch
		    node1.setAttribute("maxsize","1.2");
		 // why doesn't "1" work?  \vec nearly disappears in firefox
		if (isIE && symbol.input == "\\bar")
	    node1.setAttribute("maxsize","0.5");
		if (symbol.input == "\\underbrace" || symbol.input == "\\underline")
		  node1.setAttribute("accentunder","true");
		else
		  node1.setAttribute("accent","true");
		node.appendChild(node1);
		if (symbol.input == "\\overbrace" || symbol.input == "\\underbrace")
		  node.ttype = UNDEROVER;
		return [node,result[1],symbol.tag];
      } else {			      // font change or displaystyle command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
                if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91) newst = newst +
                  String.fromCharCode(symbol.codes[st.charCodeAt(j)-65]);
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=AMcreateElementMathML("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(AMcreateElementMathML("mo").
          appendChild(document.createTextNode(newst)),result[0].childNodes[i]);
            }
        }
        node = AMcreateMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
	if (symbol.input == "\\scriptstyle" ||
	    symbol.input == "\\scriptscriptstyle")
		node.setAttribute("displaystyle","false");
	return [node,result[1],symbol.tag];
      }
  case BINARY:
    result = AMparseSexpr(str);
    if (result[0]==null) return [AMcreateMmlNode("mo",document.createTextNode(symbol.input)),str,null];
    result2 = AMparseSexpr(result[1]);
    if (result2[0]==null) return [AMcreateMmlNode("mo",document.createTextNode(symbol.input)),str,null];
    //added by J. Knisley to allow \textcolor and \colorbox within equations
    if (symbol.input=="\\textcolor" || symbol.input=="\\colorbox") { 
      var tclr = str.match(/\{\s*([#\w]+)\s*\}/); //get's color from beginning of str
      str = str.replace(/\{\s*[#\w]+\s*\}/,""); 
      if(tclr!=null) {
         if(IsColorName.test(tclr[1].toLowerCase())) {
   	       tclr=LaTeXColor[tclr[1].toLowerCase()];
         } else {
           tclr=tclr[1]; // no checking for valid color!!
         } 
         node = AMcreateElementMathML("mstyle");
         node.setAttribute(symbol.atval,tclr);
         node.appendChild(result2[0]); 
         return [node,result2[1],symbol.tag];  
      } 
    }  
    if (symbol.input=="\\root" || symbol.input=="\\stackrel") newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol.input=="\\frac") newFrag.appendChild(result2[0]);
    return [AMcreateMmlNode(symbol.tag,newFrag),result2[1],symbol.tag];
  case INFIX:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return [AMcreateMmlNode("mo",document.createTextNode(symbol.output)),
	str,symbol.tag];
  default:
    return [AMcreateMmlNode(symbol.tag,        //its a constant
	document.createTextNode(symbol.output)),str,symbol.tag];
  }
}

function AMparseIexpr(str) {
  var symbol, sym1, sym2, node, result, tag, underover;
  str = AMremoveCharsAndBlanks(str,0);
  sym1 = AMgetSymbol(str);
  result = AMparseSexpr(str);
  node = result[0];
  str = result[1];
  tag = result[2];
  symbol = AMgetSymbol(str);
  if (symbol.ttype == INFIX) {
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
      result[0] = AMcreateMmlNode("mo",document.createTextNode("\u25A1"));
    str = result[1];
    tag = result[2];
    if (symbol.input == "_" || symbol.input == "^") {
      sym2 = AMgetSymbol(str);
      tag = null;	// no space between x^2 and a following sin, cos, etc.
// This is for \underbrace and \overbrace
      underover = ((sym1.ttype == UNDEROVER) || (node.ttype == UNDEROVER));
//    underover = (sym1.ttype == UNDEROVER);
      if (symbol.input == "_" && sym2.input == "^") {
        str = AMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = AMparseSexpr(str);
	str = res2[1];
	tag = res2[2];  // leave space between x_1^2 and a following sin etc.
        node = AMcreateMmlNode((underover?"munderover":"msubsup"),node);
        node.appendChild(result[0]);
        node.appendChild(res2[0]);
      } else if (symbol.input == "_") {
	node = AMcreateMmlNode((underover?"munder":"msub"),node);
        node.appendChild(result[0]);
      } else {
	node = AMcreateMmlNode((underover?"mover":"msup"),node);
        node.appendChild(result[0]);
      }
      node = AMcreateMmlNode("mrow",node); // so sum does not stretch
    } else {
      node = AMcreateMmlNode(symbol.tag,node);
      if (symbol.input == "\\atop" || symbol.input == "\\choose")
	node.setAttribute("linethickness","0ex");
      node.appendChild(result[0]);
      if (symbol.input == "\\choose")
	node = AMcreateMmlNode("mfenced",node);
    }
  }
  return [node,str,tag];
}

function AMparseExpr(str,rightbracket,matrix) {
  var symbol, node, result, i, tag,
  newFrag = document.createDocumentFragment();
  do {
    str = AMremoveCharsAndBlanks(str,0);
    result = AMparseIexpr(str);
    node = result[0];
    str = result[1];
    tag = result[2];
    symbol = AMgetSymbol(str);
    if (node!=undefined) {
      if ((tag == "mn" || tag == "mi") && symbol!=null &&
	typeof symbol.func == "boolean" && symbol.func) {
			// Add space before \sin in 2\sin x or x\sin x
	  var space = AMcreateElementMathML("mspace");
	  space.setAttribute("width","0.167em");
	  node = AMcreateMmlNode("mrow",node);
	  node.appendChild(space);
      }
      newFrag.appendChild(node);
    }
  } while ((symbol.ttype != RIGHTBRACKET)
        && symbol!=null && symbol.output!="");
  tag = null;
  if (symbol.ttype == RIGHTBRACKET) {
    if (symbol.input == "\\right") { // right what?
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      symbol = AMgetSymbol(str);
      if (symbol != null && symbol.input == ".")
	symbol.invisible = true;
      if (symbol != null)
	tag = symbol.rtag;
    }
    if (symbol!=null)
      str = AMremoveCharsAndBlanks(str,symbol.input.length); // ready to return
    var len = newFrag.childNodes.length;
    if (matrix &&
      len>0 && newFrag.childNodes[len-1].nodeName == "mrow" && len>1 &&
      newFrag.childNodes[len-2].nodeName == "mo" &&
      newFrag.childNodes[len-2].firstChild.nodeValue == "&") { //matrix
	var pos = []; // positions of ampersands
        var m = newFrag.childNodes.length;
        for (i=0; matrix && i<m; i=i+2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
	  for (var j=0; j<node.childNodes.length; j++)
	    if (node.childNodes[j].firstChild.nodeValue=="&")
	      pos[i][pos[i].length]=j;
        }
	var row, frag, n, k, table = document.createDocumentFragment();
	for (i=0; i<m; i=i+2) {
	  row = document.createDocumentFragment();
	  frag = document.createDocumentFragment();
	  node = newFrag.firstChild; // <mrow> -&-&...&-&- </mrow>
	  n = node.childNodes.length;
	  k = 0;
	  for (j=0; j<n; j++) {
	    if (typeof pos[i][k] != "undefined" && j==pos[i][k]){
	      node.removeChild(node.firstChild); //remove &
	      row.appendChild(AMcreateMmlNode("mtd",frag));
	      k++;
	    } else frag.appendChild(node.firstChild);
	  }
	  row.appendChild(AMcreateMmlNode("mtd",frag));
	  if (newFrag.childNodes.length>2) {
	    newFrag.removeChild(newFrag.firstChild); //remove <mrow> </mrow>
	    newFrag.removeChild(newFrag.firstChild); //remove <mo>&</mo>
	  }
	  table.appendChild(AMcreateMmlNode("mtr",row));
	}
	return [table,str];
    }
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      newFrag.appendChild(node);
    }
  }
  return [newFrag,str,tag];
}

function AMparseMath(str) {
  var result, node = AMcreateElementMathML("mstyle");
  //added by J. Knisley to allow limited implementation of \color 
  var cclr = str.match(/\\color\s*\{\s*([#\w]+)\s*\}/);
  str = str.replace(/\\color\s*\{\s*[#\w]+\s*\}/g,"");
  if(cclr!=null) {
     if(IsColorName.test(cclr[1].toLowerCase())) {
   	    cclr=LaTeXColor[cclr[1].toLowerCase()];
     } else {
        cclr=cclr[1]; // no checking for valid color!!
     }
     node.setAttribute("mathcolor",cclr);
  } else { 
    if (mathcolor != "") node.setAttribute("mathcolor",mathcolor);
  };
  if (mathfontfamily != "") node.setAttribute("fontfamily",mathfontfamily);
  node.appendChild(AMparseExpr(str.replace(/^\s+/g,""),false,false)[0]);
  node = AMcreateMmlNode("math",node);
  if (showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko
  if (false ) { //&& mathfontfamily != "" && (isIE || mathfontfamily != "serif")) {
    var fnode = AMcreateElementXHTML("font");
    fnode.setAttribute("face",mathfontfamily);
    fnode.appendChild(node);
    return fnode;
  }
  return node;
}

function AMstrarr2docFrag(arr, linebreaks) {
  var newFrag=document.createDocumentFragment();
  var expr = false;
  for (var i=0; i<arr.length; i++) {
    if (expr) newFrag.appendChild(AMparseMath(arr[i]));
    else {
      var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
      newFrag.appendChild(AMcreateElementXHTML("span").
      appendChild(document.createTextNode(arri[0])));
      for (var j=1; j<arri.length; j++) {
        newFrag.appendChild(AMcreateElementXHTML("p"));
        newFrag.appendChild(AMcreateElementXHTML("span").
        appendChild(document.createTextNode(arri[j])));
      }
    }
    expr = !expr;
  }
  return newFrag;
}

function AMprocessNodeR(n, linebreaks) {
  var mtch, str, arr, frg, i;
  if (n.childNodes.length == 0) {
   if ((n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
// DELIMITERS:
      mtch = (str.indexOf("\$")==-1 ? false : true);
      str = str.replace(/([^\\])\$/g,"$1 \$");
      str = str.replace(/^\$/," \$");	// in case \$ at start of string
      arr = str.split(" \$");
      for (i=0; i<arr.length; i++)
         arr[i]=arr[i].replace(/\\\$/g,"\$");
         if (arr.length>1 || mtch) {
           if (checkForMathML) {
             checkForMathML = false;
             var nd = AMisMathMLavailable();
             AMnoMathML = nd != null;
                if (AMnoMathML && notifyIfNoMathML)
                   if (alertIfNoMathML)
                       alert("To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\n\
                              or Firefox/Mozilla/Netscape");
            else AMbody.insertBefore(nd,AMbody.childNodes[0]);
        }
        if (!AMnoMathML) {
          frg = AMstrarr2docFrag(arr,n.nodeType==8);
          var len = frg.childNodes.length;
          n.parentNode.replaceChild(frg,n);
          return len-1;
        } else return 0;
      }
    }
   } else return 0;
  } else if (n.nodeName!="math") {
    for (i=0; i<n.childNodes.length; i++)
      i += AMprocessNodeR(n.childNodes[i], linebreaks);
  }
  return 0;
}

function AMprocessNode(n, linebreaks, spanclassAM) {
  var frag,st;
  if (spanclassAM!=null) {
    frag = document.getElementsByTagName("span")
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "AM")
        AMprocessNodeR(frag[i],linebreaks);
  } else {
    try {
      st = n.innerHTML;
    } catch(err) {}
// DELIMITERS:
    if (st==null || st.indexOf("\$")!=-1)
      AMprocessNodeR(n,linebreaks);
  }
  if (isIE) { //needed to match size and font of formula to surrounding text
    frag = document.getElementsByTagName('math');
    for (var i=0;i<frag.length;i++) frag[i].update()
  }
}

/* Below is LaTeX pre-processing to produce CSS supported */
/* standard latex structures*/
/* Jeff Knisley (knisleyj@etsu.edu)
/* Supported in part by the Howard Hughes Medical Institute */
/* as part of the Symbiosis Project: HHMI #52005872 */

var inAppendix = false;
var sectionCntr = 0;
var IEcommentWarning = true;
var biblist = [];
var bibcntr = 0;

var LaTeXCounter = [];
LaTeXCounter["definition"] = 0;
LaTeXCounter["proposition"] = 0;
LaTeXCounter["lemma"] = 0;
LaTeXCounter["theorem"] = 0;
LaTeXCounter["corollary"] = 0;
LaTeXCounter["example"] = 0;
LaTeXCounter["exercise"] = 0;
LaTeXCounter["subsection"] = 0;
LaTeXCounter["subsubsection"] = 0;
LaTeXCounter["figure"] = 0;
LaTeXCounter["equation"] = 0;
LaTeXCounter["table"] = 0;
LaTeXCounter["label"] = 0;

var LaTeXColor = [];
LaTeXColor["greenyellow"]    = "#D9FF4F";
LaTeXColor["yellow"]         = "#FFFF00";
LaTeXColor["goldenrod"]      = "#FFE529";
LaTeXColor["dandelion"]      = "#FFB529";
LaTeXColor["apricot"]        = "#FFAD7A";
LaTeXColor["peach"]          = "#FF804D";
LaTeXColor["melon"]          = "#FF8A80";
LaTeXColor["yelloworange"]   = "#FF9400";
LaTeXColor["orange"]         = "#FF6321";
LaTeXColor["burntorange"]    = "#FF7D00";
LaTeXColor["bittersweet"]    = "#C20300";
LaTeXColor["redorange"]      = "#FF3B21";
LaTeXColor["mahogany"]       = "#A60000";
LaTeXColor["maroon"]         = "#AD0000";
LaTeXColor["brickred"]       = "#B80000";
LaTeXColor["red"]            = "#FF0000";
LaTeXColor["orangered"]      = "#FF0080";
LaTeXColor["rubinered"]      = "#FF00DE";
LaTeXColor["wildstrawberry"] = "#FF0A9C";
LaTeXColor["salmon"]         = "#FF789E";
LaTeXColor["carnationpink"]  = "#FF5EFF";
LaTeXColor["magenta"]        = "#FF00FF";
LaTeXColor["violetred"]      = "#FF30FF";
LaTeXColor["rhodamine"]      = "#FF2EFF";
LaTeXColor["mulberry"]       = "#A314FA";
LaTeXColor["redviolet"]      = "#9600A8";
LaTeXColor["fuchsia"]        = "#7303EB";
LaTeXColor["lavender"]       = "#FF85FF";
LaTeXColor["thistle"]        = "#E069FF";
LaTeXColor["orchid"]         = "#AD5CFF";
LaTeXColor["darkorchid"]     = "#9933CC";
LaTeXColor["purple"]         = "#8C24FF";
LaTeXColor["plum"]           = "#8000FF";
LaTeXColor["violet"]         = "#361FFF";
LaTeXColor["royalpurple"]    = "#401AFF";
LaTeXColor["blueviolet"]     = "#1A0DF5";
LaTeXColor["periwinkle"]     = "#6E73FF";
LaTeXColor["cadetblue"]      = "#616EC4";
LaTeXColor["cornflowerblue"] = "#59DEFF";
LaTeXColor["midnightblue"]   = "#007091";
LaTeXColor["navyblue"]       = "#0F75FF";
LaTeXColor["royalblue"]      = "#0080FF";
LaTeXColor["blue"]           = "#0000FF";
LaTeXColor["cerulean"]       = "#0FE3FF";
LaTeXColor["cyan"]           = "#00FFFF";
LaTeXColor["processblue"]    = "#0AFFFF";
LaTeXColor["skyblue"]        = "#61FFE0";
LaTeXColor["turquoise"]      = "#26FFCC";
LaTeXColor["tealblue"]       = "#1FFAA3";
LaTeXColor["aquamarine"]     = "#2EFFB2";
LaTeXColor["bluegreen"]      = "#26FFAB";
LaTeXColor["emerald"]        = "#00FF80";
LaTeXColor["junglegreen"]    = "#03FF7A";
LaTeXColor["seagreen"]       = "#4FFF80";
LaTeXColor["green"]          = "#00FF00";
LaTeXColor["forestgreen"]    = "#00E000";
LaTeXColor["pinegreen"]      = "#00BF29";
LaTeXColor["limegreen"]      = "#80FF00";
LaTeXColor["yellowgreen"]    = "#8FFF42";
LaTeXColor["springgreen"]    = "#BDFF3D";
LaTeXColor["olivegreen"]     = "#009900";
LaTeXColor["rawsienna"]      = "#8C0000";
LaTeXColor["sepia"]          = "#4D0000";
LaTeXColor["brown"]          = "#660000";
LaTeXColor["tan"]            = "#DB9470";
LaTeXColor["gray"]           = "#808080";
LaTeXColor["grey"]           = "#808080";
LaTeXColor["black"]          = "#000000";
LaTeXColor["white"]          = "#FFFFFF";

var IsColorName = /^(?:greenyellow|yellow|goldenrod|dandelion|apricot|peach|melon|yelloworange|orange|burntorange|bittersweet|redorange|mahogany|maroon|brickred|red|orangered|rubinered|wildstrawberry|salmon|carnationpink|magenta|violetred|rhodamine|mulberry|redviolet|fuchsia|lavender|thistle|orchid|darkorchid|purple|plum|violet|royalpurple|blueviolet|periwinkle|cadetblue|cornflowerblue|midnightblue|navyblue|royalblue|blue|cerulean|cyan|processblue|skyblue|turquoise|tealblue|aquamarine|bluegreen|emerald|junglegreen|seagreen|green|forestgreen|pinegreen|limegreen|yellowgreen|springgreen|olivegreen|rawsienna|sepia|brown|tan|gray|grey|black|white)$/;
var IsCounter =  /^(?:definition|proposition|lemma|theorem|corollary|example|exercise|subsection|subsubsection|figure|equation|table)$/ ;
var IsLaTeXElement = /^(?:displayequation|title|author|address|date|abstract|keyword|section|subsection|subsubsection|ref|cite|thebibliography|definition|proposition|lemma|theorem|corollary|example|exercise|itemize|enumerate|enddefinition|endproposition|endlemma|endtheorem|endcorollary|endexample|endexercise|enditemize|endenumerate|LaTeXMathMLlabel|LaTeXMathML|smallskip|medskip|bigskip|quote|quotation|endquote|endquotation|center|endcenter|description|enddescription|inlinemath)$/; 
var IsTextOnlyArea = /^(?:form|textarea|pre)$/i;
var tableid = 0;

function makeNumberString(cntr) {
  if(sectionCntr > 0) {
     if(inAppendix) {
        return "A"+sectionCntr+"."+cntr;
     } else {
	return sectionCntr+"."+cntr;   
     }
  } else {
     return ""+cntr;	     
  }
};


function LaTeXpreProcess(thebody) {
   var TheBody = thebody;
   if(TheBody.hasChildNodes()) {
      if(!(IsLaTeXElement.test(TheBody.className))) 
      {
         for(var i=0; i<TheBody.childNodes.length; i++) { 
            LaTeXpreProcess(TheBody.childNodes[i])  }
      }	     
   } 
   else { 
      if(  TheBody.nodeType==3 &&  
	  !(IsTextOnlyArea.test(TheBody.parentNode.nodeName) ) ) 
      {
         var str = TheBody.nodeValue;
         if( !(str==null)) { 
            
	        str = str.replace(/\\%/g, "<per>"); // % sign
	        str = str.replace(/%[^\n]*(?=\n)/g,"");
	        str = str.replace(/%[^\r]*(?=\r)/g,""); //Used by Explorer
	        str = str.replace(/%[^\n]*$/,"") // End of text segment comment 

	        if(isIE && str.match(/%/g) != null && IEcommentWarning) {
	           alert("Comments may not have parsed properly.  Try putting in <pre class='LaTeX><div>..</div></pre> structure.");
	           IEcommentWarning = false;
	        }
	        str = str.replace(/<per>/g,"%");
	        
	        //if(str.match(/XXX[\s\S]*/)!=null) {
	        //  var tmp = str.match(/XXX[\s\S]*/)[0];
	        //  var tmpstr = tmp.charCodeAt(7)+"::"+tmp.charCodeAt(8)+"::"+tmp.charCodeAt(9)+"::"+tmp.charCodeAt(10)+"::"+tmp.charCodeAt(11)+"::"+tmp.charCodeAt(12)+"::"+tmp.charCodeAt(13);
	        //  alert(tmpstr);
	        //}

            //spacing that in LaTeXMathML may cause problems because of our approach. We use purely unicode
           //  First we remove singleton / symbols
            str = str.replace(/([^\\])\\(\s)/g,"$1\u00A0$2"); // must be a space after \ for it to make an nbsp        
 
            str = str.replace(/\\quad/g,"\u2001");
            str = str.replace(/\\qquad/g,"\u2001\u2001");
            str = str.replace(/\\enspace/g,"\u2002");
            str = str.replace(/\\;/g,"\u2004");
            str = str.replace(/\\:/g,"\u2005");
            str = str.replace(/\\,/g,"\u2006");
            str = str.replace(/\\thinspace/g,"\u200A");
            str = str.replace(/([^\\])~/g,"$1\u00A0");
            str = str.replace(/\\~/g,"~");
		 
            //Added \[ ... \] and $$..$$ functionality.  
            str = str.replace(/\\\[/g," <DEQ> $\\displaystyle{");
            str = str.replace(/\\\]/g,"}$ <DEQ> ");
            str = str.replace(/\$\$/g,"${$<DEQ>$}$");
            
            // Separate replacements for begin .. end to (eventually) allow LaTeX equations with html codes mixed in 
            // (as is the case for theorem, etc.
            // all variations of spaces with \begin{array} .. \end{array} -- not displayed, however
            str = str.replace(/\\begin\s*\{\s*array\s*\}/g,"\\begin{array}");
            str = str.replace(/\\end\s*\{\s*array\s*\}/g,"\\end{array}");
           
            // all variations of spaces with \begin{eqnarray} .. \end{eqnarray}
            str = str.replace(/\\begin\s*\{\s*eqnarray\s*\}/g,"  <DEQ>eqno$\\begin{eqnarray}");
            str = str.replace(/\\end\s*\{\s*eqnarray\s*\}/g,"\\end{eqnarray}$<DEQ>  ");

           // all variations of spaces with \begin{eqnarray*} .. \end{eqnarray*}
            str = str.replace(/\\begin\s*\{\s*eqnarray\*\s*\}/g,"  <DEQ>$\\begin{eqnarray}");
            str = str.replace(/\\end\s*\{\s*eqnarray\*\s*\}/g,"\\end{eqnarray}$<DEQ>  ");

            // all variations of spaces with \begin{displaymath} .. \end{displaymath}
            str = str.replace(/\\begin\s*\{\s*displaymath\s*\}/g," <DEQ> $\\displaystyle{");
            str = str.replace(/\\end\s*\{\s*displaymath\s*\}/g,"}$ <DEQ> ");
            
            // all variations of spaces with \begin{equation*} .. \end{equation*}
            str = str.replace(/\\begin\s*\{\s*equation\s*\*\s*\}/g," <DEQ> $\\displaystyle{");
            str = str.replace(/\\end\s*\{\s*equation\s*\*\s*\}/g,"}$ <DEQ> ");
  
             // all variations of spaces with \begin{equation} .. \end{equation}
            str = str.replace(/\\begin\s*\{\s*equation\s*\}/g," <DEQ>eqno$\\displaystyle{");
            str = str.replace(/\\end\s*\{\s*equation\s*\}/g,"}$ <DEQ> ");
	    

	    
            //now parse to translate <DEQ> structures to <table class = 'dispeq'> stuff
            //and to identify non-display math content (sections, etc).  
             
            str = str.split("<DEQ>");
            // var ntype = TheBody.nodeType;
            var newFrag = document.createDocumentFragment();
	     
            for(var i=0;i<str.length;i++) {
               if(i % 2) { 
                  //odd = table of type displayequation
                  var DEQtable = document.createElement("table");
                  DEQtable.className='displayequation';
                  var DEQtbody = document.createElement("tbody");
                   
                  var DEQtr = document.createElement("tr");
                  var DEQtdeq = document.createElement("td");
                      DEQtdeq.className='eq';
                   
                  // AfterFix to repair for $$...$$   
                  str[i] = str[i].replace(/\$\}\$/g,"$\\displaystyle{");
                  str[i] = str[i].replace(/\$\{\$/g,"}");
		                                     
                  //check for equation number via either label or eqno at beginning -- \nonumber is removed
                  var lbl = str[i].match(/\\label\s*\{\s*(\w+)\s*\}/);
                  var ISeqno = str[i].match(/^eqno/);
                   
                  // append nodes into row                 
                  str[i] = str[i].replace(/^eqno/," ");
                  str[i] = str[i].replace(/\\label\s*\{\s*\w+\s*\}/," ");
                  DEQtdeq.appendChild(document.createTextNode( str[i] ) );
                  DEQtr.appendChild(DEQtdeq);

                  str[i] = str[i].replace(/\\nonumber/g,"");
                  
                  if(ISeqno!=null || lbl !=null) {
                     var DEQtdno = document.createElement("td");
                         DEQtdno.className='eqno';
                     LaTeXCounter["equation"]++;
		             var eqnoString = makeNumberString(LaTeXCounter["equation"]);
                     
		             var DEQanchor = document.createElement("a");
		             if(lbl!=null) { DEQanchor.id = lbl[1] };
		             DEQanchor.className = "eqno";
		             var anchorSpan = document.createElement("span");
		             anchorSpan.className = "eqno";
		             anchorSpan.style.display = "none";
		             anchorSpan.appendChild(document.createTextNode(eqnoString));
		             DEQanchor.appendChild(anchorSpan);
                     DEQtdno.appendChild(DEQanchor);
		             var DEQspan = document.createElement("span"); 
		             DEQspan.className = "eqno"; 
		             DEQspan.appendChild(document.createTextNode("("+eqnoString+")" )); 
                     DEQtdno.appendChild(DEQspan); 
                     DEQtr.appendChild(DEQtdno);
                  }
                  DEQtbody.appendChild(DEQtr);
		          DEQtable.appendChild(DEQtbody);
                  newFrag.appendChild(DEQtable);
               } 
               else { 
                  //even = this is text, where we may have sections, labels, subsections, and so on 
 
                  // AfterFix to repair for $$...$$   
                  str[i] = str[i].replace(/\$\}\$/g,"");
                  str[i] = str[i].replace(/\$\{\$/g,"");
			  
		          //Some stuff we just want to remove
                  str[i] = str[i].replace(/\\maketitle/g,"");
                  str[i] = str[i].replace(/\\begin\s*\{\s*document\s*\}/g,"");
       	    	  str[i] = str[i].replace(/\\end\s*\{\s*document\s*\}/g,"");
       	    	  str[i] = str[i].replace(/\\documentclass[^\}]*?\}/g,"");
		          str[i] = str[i].replace(/\\usepackage[^\}]*?\}/g,""); //ignores packages and their options
		          str[i] = str[i].replace(/\\noindent/g,"");
		          str[i] = str[i].replace(/\\notag/g,"");
                          		 
                  //Next: labels, ref's, hrefs, urls, and cites
                  str[i] = str[i].replace(/\\ref\s*\{\s*(\w+)\}/g," \\[ref\\]$1\\[ ");
		          str[i] = str[i].replace (/\\url\s*\{\s*([^\}\n]+)\}/g," \\[url\\]$1\\[ ");
                  str[i] = str[i].replace(/\\href\s*\{\s*([^\}]+)\}\s*\{\s*([^\}]+)\}/g," \\[href\\]$1\\]$2\\[ ");
                  str[i] = str[i].replace(/\\cite\s*\{\s*(\w+)\}/g," \\[cite\\]$1\\[ ");
		  
		          //Miscellaneous stuff!!
		          str[i] = str[i].replace(/\\qed/g,"\u220E");
		          str[i] = str[i].replace(/\\endproof/g,"\u220E");
		          str[i] = str[i].replace(/\\proof/g,"\\textbf{Proof: }");

		          //breaks and skips
	              str[i] = str[i].replace(/\\n(?=\s)/g, " \\[br\\] \\[ ");
		          str[i] = str[i].replace(/\\newline/g," \\[br\\] \\[ ");
		          str[i] = str[i].replace(/\\linebreak/g," \\[br\\] \\[ ");
               	  str[i] = str[i].replace(/\\smallskip/g," \\[logicalbreak\\]smallskip\\[ "); 
	              str[i] = str[i].replace(/\\medskip/g," \\[logicalbreak\\]medskip\\[ ");
	              str[i] = str[i].replace(/\\bigskip/g," \\[logicalbreak\\]bigskip\\[ ");
		          str[i] = str[i].replace(/[\n\r]+[ \f\n\r\t\v\u2028\u2029]*[\n\r]+/g," \\[logicalbreak\\]LaTeXMathML\\[ ");  // extra return replaced by <p>
		          if(isIE) {
		             str[i] = str[i].replace(/\r/g," ");  // replace \r by a space to aid spacing!
		          }

		  
		          //items and appendix
		          str[i] = str[i].replace(/\\bibitem\s*([^\{]*\{\s*\w*\s*\})/g," \\[bibitem\\]$1\\[ ");
                  str[i] = str[i].replace(/\\bibitem\s*/g," \\[bibitem\\] \\[ ");
		          str[i] = str[i].replace(/\\item\s*\[\s*(\w+)\s*\]/g," \\[alistitem\\]$1\\[ ");
		          str[i] = str[i].replace(/\\item\s*/g," \\[alistitem\\] \\[ ");
  		          str[i] = str[i].replace(/\\appendix/g," \\[appendix\\] \\[ ");


                  // \includegraphics[][]{image} -- no processing of options.  This treatment is DANGEROUS.  It assumes no html will be
		          // placed within the \begin{figure} ... \end{figure} structure, and the [\s\S] character class could lead to strange matches
	              str[i] = str[i].replace(/\\begin\s*\{\s*figure\s*\}([\s\S]+?)\\end\s*\{\s*figure\s*\}/g," \\[figure\\]$1\\[ ");
                  str[i] = str[i].replace(/\\begin\s*\{\s*table\s*\}([\s\S]+?)\\end\s*\{\s*table\s*\}/g," \\[table\\]$1\\[ ");
		          //str[i] = str[i].replace(/\\begin\s*\{\s*array\s*\}([\s\S]+?)\\end\s*\{\s*array\s*\}/g," \\[array\\]$1\\[ ");
                  //goal is to protect array \\ from being converted into linebreaks
                  
                  //This construction allows css classes for divs for these elements, but the CSS will have to be supplied through a 
                  //css file or <script> .. </script> in the header.  (It makes sense to me that style files in LaTeX should correspond
                  //to css and/or xslt when translating to mathml, but \ref's are a problem).
                  str[i] = str[i].replace(/\\begin\s*\{\s*theorem\s*\}/g," \\[theorem\\]Theorem \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*theorem\s*\}/g," \\[endtheorem\\] \\[ ");

                  str[i] = str[i].replace(/\\begin\s*\{\s*definition\s*\}/g," \\[definition\\]Definition \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*definition\s*\}/g," \\[enddefinition\\] \\[ ");
           
                  str[i] = str[i].replace(/\\begin\s*\{\s*lemma\s*\}/g," \\[lemma\\]Lemma \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*lemma\s*\}/g," \\[endlemma\\] \\[ ");

                  str[i] = str[i].replace(/\\begin\s*\{\s*corollary\s*\}/g," \\[corollary\\]Corollary \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*corollary\s*\}/g," \\[endcorollary\\] \\[ ");
          
                  str[i] = str[i].replace(/\\begin\s*\{\s*proposition\s*\}/g," \\[proposition\\]Proposition \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*proposition\s*\}/g," \\[endproposition\\] \\[ ");

                  str[i] = str[i].replace(/\\begin\s*\{\s*example\s*\}/g," \\[example\\]Example \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*example\s*\}/g," \\[endexample\\] \\[ ");
	           
                  str[i] = str[i].replace(/\\begin\s*\{\s*exercise\s*\}/g," \\[exercise\\]Exercise \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*exercise\s*\}/g," \\[endexercise\\] \\[ ");

                  str[i] = str[i].replace(/\\begin\s*\{\s*thebibliography\s*\}\s*\{\s*\w+\s*\}/g," \\[thebibliography\\]References \\[ "); 
                  str[i] = str[i].replace(/\\begin\s*\{\s*thebibliography\s*\}/g," \\[thebibliography\\]References \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*thebibliography\s*\}/g," \\[endthebibliography\\]References \\[ ");
		  

                  str[i] = str[i].replace(/\\begin\s*\{\s*proof\s*\}/g," \\[proof\\]Proof: \\[ "); 
                  if(isIE) {  //IE is just so weird
                     str[i] = str[i].replace(/\\end\s*\{\s*proof\s*\}/g,"\u220E \\[endproof\\] \\[ ");
                  } else { 
                     str[i] = str[i].replace(/\\end\s*\{\s*proof\s*\}/g," \\[endproof\\] \\[ ");
                  }
		  
                  //The frontmatter -- all translated to div's to be handled by CSS
                  str[i] = str[i].replace(/\\title\s*\{\s*([^\}]+)\}/g," \\[title\\] \\[$1 \\[endtitle\\] \\[ ");
                  str[i] = str[i].replace(/\\author\s*\{\s*([^\}]+)\}/g," \\[author\\] \\[$1 \\[endauthor\\] \\[ ");
                  str[i] = str[i].replace(/\\address\s*\{\s*([^\}]+)\}/g," \\[address\\] \\[$1 \\[endaddress\\] \\[ ");
                  str[i] = str[i].replace(/\\date\s*\{\s*([^\}]+)\}/g," \\[date\\] \\[$1 \\[enddate\\] \\[ ");
                  str[i] = str[i].replace(/\\begin\s*\{\s*keyword\s*\}/g," \\[keyword\\] \\[ "); 
                  str[i] = str[i].replace(/\\end\s*\{\s*keyword\s*\}/g," \\[endkeyword\\] \\[ ");
                  str[i] = str[i].replace(/\\begin\s*\{\s*abstract\s*\}/g," \\[abstract\\] \\[ "); 
	              str[i] = str[i].replace(/\\end\s*\{\s*abstract\s*\}/g," \\[endabstract\\] \\[ ");
		  
                  //The rest of the environments -- Users can even "make up their own" -- but it avoids the array and tabular environments
                  str[i] = str[i].replace(/\\begin\s*\{\s*(?!array|tabular)(\w+)\s*\}/g," \\[$1\\] \\[ ");
                  str[i] = str[i].replace(/\\end\s*\{\s*(?!array|tabular)(\w+)\s*\}/g," \\[end$1\\] \\[ ");

                  //Next, we look at section--subsection stuff.  This is nested -- this would be so much better if LaTeX used 
                  //some type of \begin{sectionhead}...\end{sectionhead} structure
                  var sectionIndex = str[i].search(/\\section\s*\{\s*[\s\S]+\}/); 
		  
                  while(sectionIndex >= 0) { 
                     str[i] = str[i].replace(/\\section\s*\{/ ," \\[section\\]");
                     var delimcnt = 1;
                     for(var ii=sectionIndex;ii<str[i].length;ii++) { 
                        if(str[i].charAt(ii) == "{") { delimcnt++ };
                        if(str[i].charAt(ii) == "}") { delimcnt-- };
                        if(delimcnt == 0) { 
                           str[i] = str[i].substring(0,ii)+"\\[ "+str[i].substring(ii+1,str[i].length) ;
                           break;
                        }
                     };
                     sectionIndex = str[i].search(/\\section\s*\{\s*[\s\S]+\}/); //look for next
                  }
		  
	              sectionIndex = str[i].search(/\\subsection\s*\{\s*[\s\S]+\}/); 
		  
                  while(sectionIndex >= 0) { 
                     str[i] = str[i].replace(/\\subsection\s*\{/ ," \\[subsection\\]");
                     var delimcnt = 1;
                     for(var ii=sectionIndex;ii<str[i].length;ii++) { 
                        if(str[i].charAt(ii) == "{") { delimcnt++ };
                        if(str[i].charAt(ii) == "}") { delimcnt-- };
                        if(delimcnt == 0) { 
                           str[i] = str[i].substring(0,ii)+"\\[ "+str[i].substring(ii+1,str[i].length) ;
                           break;
                        }
                     };
                     sectionIndex = str[i].search(/\\subsection\s*\{\s*[\s\S]+\}/); //look for next
                  }
	
                  sectionIndex = str[i].search(/\\subsubsection\s*\{\s*[\s\S]+\}/); 
		  
                  while(sectionIndex >= 0) { 
                     str[i] = str[i].replace(/\\subsubsection\s*\{/ ," \\[subsubsection\\]");
                     var delimcnt = 1;
                     for(var ii=sectionIndex;ii<str[i].length;ii++) { 
                        if(str[i].charAt(ii) == "{") { delimcnt++ };
                        if(str[i].charAt(ii) == "}") { delimcnt-- };
                        if(delimcnt == 0) { 
                           str[i] = str[i].substring(0,ii)+"\\[ "+str[i].substring(ii+1,str[i].length) ;
                           break;
                        }
                     };
                     sectionIndex = str[i].search(/\\subsubsection\s*\{\s*[\s\S]+\}/); //look for next
                   }		  

                  var CatToNextEven = "";                                       
                  //split into alternating text elements and "marked" elements                   
                  var strtmp = str[i].split("\\[");
                  //document.write(strtmp[0]);
                                
                  for(var j=0;j<strtmp.length;j++) {
                     if(j % 2) { 
                        //odd = split on \\]
                        var strtmparray = strtmp[j].split("\\]");
                        switch (strtmparray[0]) {
                           case "section":
                              var nodeTmp = document.createElement("H2");
                              nodeTmp.className = 'section'; 
                              //reset counters  
                                sectionCntr++;
                                for (var div in LaTeXCounter) { LaTeXCounter[div] = 0 };
                              //Create Title of section
                              var nodeAnchor = document.createElement("a");
                              if(inAppendix) {
                                 nodeAnchor.className='appendixsection';
                              } else {
                                 nodeAnchor.className='section';
                              }
                              var nodeNumString = makeNumberString("");
                              var anchorSpan = document.createElement("span");
                              anchorSpan.className = "section";
                              anchorSpan.style.display = "none";
                              anchorSpan.appendChild(document.createTextNode(nodeNumString));
                              nodeAnchor.appendChild(anchorSpan);
                              nodeTmp.appendChild(nodeAnchor);
			      
                              var nodeSpan = document.createElement("span");
                              nodeSpan.className = 'section';
                              nodeSpan.appendChild(document.createTextNode(nodeNumString+" "));
                              nodeTmp.appendChild(nodeSpan);
                              nodeTmp.appendChild(document.createTextNode( strtmparray[1] ) );
                              newFrag.appendChild(nodeTmp);  
                           break;
                           case "subsection":
                              var nodeTmp = document.createElement("H3");
                              nodeTmp.className = 'subsection'; 
                              //counters  
                                LaTeXCounter["subsection"]++;
                                LaTeXCounter["subsubsection"]=0;
                             //Create Title of section
                              var nodeAnchor = document.createElement("a");
                              nodeAnchor.className = 'subsection';
                              var nodeNumString = makeNumberString(LaTeXCounter["subsection"]);
                              var anchorSpan = document.createElement("span");
                              anchorSpan.className = "subsection";
                              anchorSpan.style.display = "none";
                              anchorSpan.appendChild(document.createTextNode(nodeNumString));
                              nodeAnchor.appendChild(anchorSpan);
                              nodeTmp.appendChild(nodeAnchor);			      
                              var nodeSpan = document.createElement("span");
                              nodeSpan.className = 'subsection';
                              nodeSpan.appendChild(document.createTextNode(nodeNumString+". "));
                              nodeTmp.appendChild(nodeSpan);			      
                              nodeTmp.appendChild(document.createTextNode( strtmparray[1] ) );
                              newFrag.appendChild(nodeTmp);  
                           break;
                           case "subsubsection":
                              var nodeTmp = document.createElement("H4");
                              nodeTmp.className = 'subsubsection'; 
                               //counters  
                                LaTeXCounter["subsubsection"]++;
                              //Create Title of section
                              var nodeAnchor = document.createElement("a");
                              nodeAnchor.className = 'subsubsection';
                              var nodeNumString = makeNumberString(LaTeXCounter["subsection"]+"."+LaTeXCounter["subsubsection"]);
                              var anchorSpan = document.createElement("span");
                              anchorSpan.className = "subsubsection";
                              anchorSpan.style.display = "none";
                              anchorSpan.appendChild(document.createTextNode(nodeNumString));
                              nodeAnchor.appendChild(anchorSpan);
                              nodeTmp.appendChild(nodeAnchor);			      
                              var nodeSpan = document.createElement("span");
                              nodeSpan.className = 'subsubsection';
                              nodeSpan.appendChild(document.createTextNode(nodeNumString+". "));
                              nodeTmp.appendChild(nodeSpan);			      
                              nodeTmp.appendChild(document.createTextNode( strtmparray[1] ) );
                              newFrag.appendChild(nodeTmp);  
                           break;
                           case "href":
                              var nodeTmp = document.createElement("a");
                              nodeTmp.className = 'LaTeXMathML'; 
                              nodeTmp.href = strtmparray[1];
                              nodeTmp.appendChild(document.createTextNode( strtmparray[2]));
                              newFrag.appendChild(nodeTmp);                                                                                                                
                           break;
                           case "url":
                              var nodeTmp = document.createElement("a");
                              nodeTmp.className = 'LaTeXMathML'; 
                              nodeTmp.href = strtmparray[1];
                              nodeTmp.appendChild(document.createTextNode( strtmparray[1]));
                              newFrag.appendChild(nodeTmp);                             
                           break;
                           case "figure":
                              var nodeTmp = document.createElement("table");
                              nodeTmp.className = 'figure'; 
                              var FIGtbody = document.createElement("tbody");
 
                              var FIGlbl = strtmparray[1].match(/\\label\s*\{\s*(\w+)\s*\}/);
                              strtmparray[1]=strtmparray[1].replace(/\\label\s*\{\w+\}/g,"");	
			      
                              var capIndex = strtmparray[1].search(/\\caption\s*\{[\s\S]+\}/);  
                              var FIGcap = "";
			      
                              if(capIndex >= 0) { // caption may contain other {  } structures -- but not displaymath!!
                                 var tmp = strtmparray[1];
                                 var delimcnt = 0;
                              	 var capstart = -1;
                                 for(var pos=capIndex;pos<tmp.length;pos++) { 
                                    if(tmp.charAt(pos) == "{") { delimcnt++ };
                                    if(tmp.charAt(pos) == "}") { delimcnt-- };
                                    if(delimcnt == 1 && capstart<0) { capstart = pos+1 };
                                    if(delimcnt == 0 && capstart>0) { 
                                       capend = pos-1; 
                                       FIGcap = tmp.substring(capstart,pos);
                                       break 
                                    }
                                 }
                              }
                                                   
                              var FIGtr2 = document.createElement("tr");
                              var FIGtd2  = document.createElement("td");
                              FIGtd2.className="caption";
                  
                               
                              var FIGanchor = document.createElement("a");
                              FIGanchor.className = "figure";
                              if(FIGlbl!=null) {  FIGanchor.id = FIGlbl[1]; }
                              LaTeXCounter["figure"]++;
                              var fignmbr = makeNumberString(LaTeXCounter["figure"]);
                              var anchorSpan = document.createElement("span");
                              anchorSpan.className = "figure";
                              anchorSpan.style.display = "none";
                              anchorSpan.appendChild(document.createTextNode(fignmbr));  
                              FIGanchor.appendChild(anchorSpan); 			     
                              FIGtd2.appendChild(FIGanchor);
			      
                              var FIGspan = document.createElement("span");
                              FIGspan.className = "figure"; //For CSS counters, comment this line
                              FIGspan.appendChild(document.createTextNode("Figure "+fignmbr+". " ) );
                              FIGtd2.appendChild(FIGspan);
                              FIGtd2.appendChild(document.createTextNode(""+FIGcap));
                              FIGtr2.appendChild(FIGtd2);
                              FIGtbody.appendChild(FIGtr2);
                              var IsSpecial = false;
			      
                              var FIGinfo = strtmparray[1].match(/\\includegraphics\s*\{([^\}]+)\}/);
                              if(FIGinfo==null) { //options not processed, for now
                                 FIGinfo = strtmparray[1].match(/\\includegraphics\s*\[[^\]]*\]\s*\{\s*([^\}]+)\s*\}/);
                              }
                              if(FIGinfo==null) {
                                 FIGinfo = strtmparray[1].match(/\\special\s*\{\s*([^\}]+)\}/);
                                 IsSpecial=true //Hook: Later can include "special" graphics commands
                              };
                         
                              if(FIGinfo!=null) { //Caption will be above the image
                                 var FIGtr1 = document.createElement("tr");
                                 var FIGtd1  = document.createElement("td");
                                 FIGtd1.className="image";
                                 var FIGimg = document.createElement("img");
                                 var FIGsrc = FIGinfo[1]; //options not processed, for now
                                 FIGimg.src = FIGsrc;
                                 FIGimg.alt = "Figure "+FIGsrc+" did not load";
                                 FIGimg.title = "Figure "+fignmbr+". "+FIGcap;
                                 FIGimg.id = "figure"+fignmbr;
                                 FIGtd1.appendChild(FIGimg);
                                 FIGtr1.appendChild(FIGtd1);
                                 FIGtbody.appendChild(FIGtr1);
                              }
                              nodeTmp.appendChild(FIGtbody);
                              newFrag.appendChild(nodeTmp); 		      
                           break;
                           case "table": 
                              var nodeTmp = document.createElement("table");
                              if(strtmparray[1].search(/\\centering/) >= 0) {
                                 nodeTmp.className = 'LaTeXtable centered';
                                 nodeTmp.align = "center";
                              } else {
                                 nodeTmp.className = 'LaTeXtable'; 
                              };
                              tableid++;
                              nodeTmp.id = "LaTeXtable"+tableid; //unique id for each table
                              
                              var TABlbl = strtmparray[1].match(/\\label\s*\{\s*(\w+)\s*\}/);
                              strtmparray[1]=strtmparray[1].replace(/\\label\s*\{\w+\}/g,"");	
			      
                              var capIndex = strtmparray[1].search(/\\caption\s*\{[\s\S]+\}/);  
                              var TABcap = "";
			      
                              if(capIndex >= 0) { // caption may contain other {  } structures -- but not displaymath!!
                                 var tmp = strtmparray[1]; 
                                 var delimcnt = 0;
                                 var capstart = -1;
                                 for(var pos=capIndex;pos<tmp.length;pos++) { 
                                    if(tmp.charAt(pos) == "{") { delimcnt++ };
                                    if(tmp.charAt(pos) == "}") { delimcnt-- };
                                    if(delimcnt == 1 && capstart<0) { capstart = pos+1 };
                                    if(delimcnt == 0 && capstart>0) { 
	                                   capend = pos-1; 
                           		       TABcap = tmp.substring(capstart,pos);
								       break 
								    }
								 }
			  				  }
                                                   
                              if(TABcap!="") {
                                 var TABtbody = document.createElement("tbody");
                                 var TABcaption = document.createElement("caption");
                                 TABcaption.className="LaTeXtable centered";
                                 var TABanchor = document.createElement("a");
   			        			 TABanchor.className = "LaTeXtable";
                                 if(TABlbl!=null) {  TABanchor.id = TABlbl[1]; }
                                 LaTeXCounter["table"]++;
	   					         var tabnmbr = makeNumberString(LaTeXCounter["table"]);
						         var anchorSpan = document.createElement("span");
						         anchorSpan.className = "LaTeXtable";
						         anchorSpan.style.display = "none";
						         anchorSpan.appendChild(document.createTextNode(tabnmbr));  
                                 TABanchor.appendChild(anchorSpan); 			     
						         TABcaption.appendChild(TABanchor);
			      
						         var TABspan = document.createElement("span");
                                 TABspan.className = "LaTeXtable"; //For CSS counters, comment this line
                                 TABspan.appendChild(document.createTextNode("Table "+tabnmbr+". " ) );
						         TABcaption.appendChild(TABspan);
						         TABcaption.appendChild(document.createTextNode(""+TABcap));
                                 nodeTmp.appendChild(TABcaption);
						      }
                              var TABinfo = strtmparray[1].match(/\\begin\s*\{\s*tabular\s*\}([\s\S]+)\\end\s*\{\s*tabular\s*\}/);
						      if(TABinfo!=null) { 
								 var TABtbody = document.createElement('tbody');
								 var TABrow = null;
								 var TABcell = null;
								 var row=0;
								 var col=0;
				 
								 var TABalign = TABinfo[1].match(/^\s*\{([^\}]+)\}/);
								 TABinfo = TABinfo[1].replace(/^\s*\{[^\}]+\}/,"");
								 TABinfo = TABinfo.replace(/\\hline/g,""); //no horizontal bars
								 TABalign[1] = TABalign[1].replace(/\|/g,""); //no vertical bars
								 TABalign[1] = TABalign[1].replace(/\s/g,""); 
								 TABinfo = TABinfo.split("\\\\"); // into rows
								 for(row=0;row<TABinfo.length;row++) {
						            TABrow = document.createElement("tr");
								    TABinfo[row] = TABinfo[row].split("&");
								    for(col=0;col<TABinfo[row].length;col++) {
								       TABcell = document.createElement("td");
								       switch (TABalign[1].charAt(col)) {
						                  case "l":
										     TABcell.style.textAlign = "left";
								          break;
						                  case "c":
										     TABcell.style.textAlign = "center";
								          break;
						                  case "r":
										     TABcell.style.textAlign = "right";
								          break;
						                  default :
										     TABcell.style.textAlign = "left";
								       };
								       TABcell.appendChild(document.createTextNode(TABinfo[row][col]));
								       TABrow.appendChild(TABcell);
								    }
								    TABtbody.appendChild(TABrow);
						         }
						         nodeTmp.appendChild(TABtbody);
						      }
                              newFrag.appendChild(nodeTmp);                                                                                                                  
                           break;
						   case "logicalbreak":
                              var nodeTmp = document.createElement("p");
                              nodeTmp.className = strtmparray[1]; 
						      nodeTmp.appendChild(document.createTextNode("\u00A0"));
						      newFrag.appendChild(nodeTmp);                                                                                                                  
                           break;
						   case "appendix":
                              inAppendix=true;
                              sectionCntr=0;
						   break;
						   case "alistitem":
                              var EndDiv = document.createElement("div");
						      EndDiv.className = "endlistitem";
                              newFrag.appendChild(EndDiv);
						      var BegDiv = document.createElement("div");
                              BegDiv.className = "listitem"; 
						      if(strtmparray[1]!=" ") {
                                 var BegSpan = document.createElement("span");
                                 BegSpan.className="listitemmarker";
								 var boldBegSpan = document.createElement("b");
								 boldBegSpan.appendChild(document.createTextNode(strtmparray[1]+" "));
								 BegSpan.appendChild(boldBegSpan);
								 BegDiv.appendChild(BegSpan);
                              }
						      newFrag.appendChild(BegDiv);                                                                                                                  
                           break;
                           case "br":
                              newFrag.appendChild(document.createElement("br"));                                                                                                                  
                           break;
                           case "bibitem":
						      newFrag.appendChild(document.createElement("br"));
						      var nodeTmp = document.createElement("a");
 						      nodeTmp.className = 'bibitem'; 
  		    			      var nodeSpan = document.createElement("span");
 						      nodeSpan.className = 'bibitem'; 

						      bibcntr++;
			      
						      var lbl = strtmparray[1].match(/\{\s*(\w+)\s*\}/); 
						      strtmparray[1] = strtmparray[1].replace(/\s*\{\s*\w+\s*\}/g,"");			     
						      strtmparray[1] = strtmparray[1].replace(/^\s*\[/,"");
						      strtmparray[1] = strtmparray[1].replace(/\s*\]$/,""); 
  		    			      strtmparray[1] = strtmparray[1].replace(/^\s+|\s+$/g,"");
						      //We create a list of id's for the bibitems -- it seemed important at one time??
						      if(lbl==null) {
								 biblist[bibcntr] = "bibitem"+bibcntr
						      } else {
						         biblist[bibcntr] = lbl[1];
						      }; 
						      nodeTmp.name = biblist[bibcntr];
						      nodeTmp.id = biblist[bibcntr];
						      // We place content into <a> -- access it with \cite, thus allowing appropriate labels!
						      if(strtmparray[1]!="") {
								 nodeSpan.appendChild(document.createTextNode(strtmparray[1]));
                              } else { 
                                 nodeSpan.appendChild(document.createTextNode("["+bibcntr+"]"));
                              }
						      nodeTmp.appendChild(nodeSpan);
						      newFrag.appendChild(nodeTmp);
                           break;
                           case "cite":
                              var nodeTmp = document.createElement("a");
                              nodeTmp.className = 'cite'; 
                              nodeTmp.name = 'cite';
                              nodeTmp.href = "#"+strtmparray[1];
                              newFrag.appendChild(nodeTmp);                                                                                                                  
                           break;
                           case "ref":
                              var nodeTmp = document.createElement("a"); 
                              nodeTmp.className = 'ref'; 
                              nodeTmp.name = 'ref';
                              nodeTmp.href = "#"+strtmparray[1];
                              newFrag.appendChild(nodeTmp);                                                                                      
                           break;
                           default : 
                              var nodeTmp = document.createElement("div");
                              nodeTmp.className = strtmparray[0]; 
                              if( IsCounter.test(strtmparray[0]) ) { 
								 LaTeXCounter[strtmparray[0]]++;
                                 var nodeAnchor = document.createElement("a");
                                 nodeAnchor.className = strtmparray[0];
								 var divnum = makeNumberString(LaTeXCounter[strtmparray[0]]);
				 				 var anchorSpan = document.createElement("span");
								 anchorSpan.className = strtmparray[0];
								 anchorSpan.appendChild(document.createTextNode(divnum));
								 anchorSpan.style.display="none";
								 nodeAnchor.appendChild(anchorSpan);
								 nodeTmp.appendChild(nodeAnchor);
				 
								 var nodeSpan = document.createElement("span");
                                 nodeSpan.className = strtmparray[0];
								 nodeSpan.appendChild(document.createTextNode(strtmparray[1]+" "+divnum+". "));
                                 nodeTmp.appendChild(nodeSpan);
                              }
						      if(isIE) { //remove if IE supports :before and :after
								 if(strtmparray[0]==("thebibliography"||"abstract"||"keyword"||"proof")) {
                                    var nodeSpan = document.createElement("span");
                                    nodeSpan.className = strtmparray[0];
								    nodeSpan.appendChild(document.createTextNode(strtmparray[1]));
                                    nodeTmp.appendChild(nodeSpan);
                                 }
                              } //end of IE :before and :after fixes
			    			  if(strtmparray[0]=="endenumerate" || strtmparray[0]=="enditemize" || strtmparray[0]=="enddescription") {
                                 var endDiv = document.createElement("div");
                                 endDiv.className = "endlistitem";
								 newFrag.appendChild(endDiv);
                              }
                              newFrag.appendChild(nodeTmp);
			    			  if(strtmparray[0]=="enumerate" || strtmparray[0]=="itemize" || strtmparray[0]=="description") {
                                 var endDiv = document.createElement("div");
                                 endDiv.className = "listitem";
								 newFrag.appendChild(endDiv);
                              }
                         }
                      } else { 
                      	 //even = text, labels, bf, and italics, and linebreaks, and math -- we now remove the math
                         strtmp[j] = strtmp[j].replace(/\\\$/g,"<per>");
                         strtmp[j] = strtmp[j].replace(/\$([^\$]+)\$/g," \\[$1\\[ ");
                         strtmp[j] = strtmp[j].replace(/<per>/g,"\\$");
                         strtmp[j] = strtmp[j].replace(/\\begin\s*\{\s*math\s*\}([\s\S]+?)\\end\s*\{\s*math\s*\}/g," \\[$1\\[ ");

						 var strtmptmp = strtmp[j].split("\\[");
                         
                         for(var jjj=0;jjj<strtmptmp.length;jjj++) {
                            if(jjj % 2) { //odd = math
                              var nodeTmp = document.createElement("span");
                              nodeTmp.className = 'inlinemath';
                              nodeTmp.appendChild(document.createTextNode("$"+strtmptmp[jjj]+"$"));
                              newFrag.appendChild(nodeTmp);
                            } else {
		      			 	  //all other tags will be mapped to span's (most should be font-face tags) with class-names matching the tag name. 
                              //Exceptions will be textcolor, colorbox, textbf, textit, and emph.  These cannot include any html tags.  
		      			 	    var TagIndex = strtmptmp[jjj].search(/\\\w+/);
		      			 	    var tmpIndex = TagIndex; 
		      			 	    while(tmpIndex>-1) {
		      			 	       if(/^\\textcolor/.test(strtmptmp[jjj].substring(TagIndex,strtmptmp[jjj].length))) { 
		      			 	          strtmptmp[jjj] = strtmptmp[jjj].replace(/\\textcolor\s*\{\s*(\w+)\s*\}\s*/," \\[textcolor\\]$1\\]|");
		      			 	       } else { 
		      			 	          if(/^\\colorbox/.test(strtmptmp[jjj].substring(TagIndex,strtmptmp[jjj].length))) { 
		      			 	             strtmptmp[jjj] = strtmptmp[jjj].replace(/\\colorbox\s*\{\s*(\w+)\s*\}\s*/," \\[colorbox\\]$1\\]|");
		      			 	          } else {
		      			 	             strtmptmp[jjj] = strtmptmp[jjj].substring(0,TagIndex)+strtmptmp[jjj].substring(TagIndex,strtmptmp[jjj].length).replace(/\\\s*(\w+)\s*/," \\[$1\\]|");
		      			 	          }
		      			 	       }
		      			 	       TagIndex +=strtmptmp[jjj].substring(TagIndex,strtmptmp[jjj].length).search(/\|/);
		      			 	       TagIndex++;
		      			 	       strtmptmp[jjj] = strtmptmp[jjj].replace(/\\\]\|/,"\\] ");
		      			 	       if(strtmptmp[jjj].charAt(TagIndex) == "{") {
		      			 	          strtmptmp[jjj] = strtmptmp[jjj].substring(0,TagIndex)+strtmptmp[jjj].substring(TagIndex+1,strtmptmp[jjj].length); 
		      			 	          var delimcnt = 1;
		      			 	          for(var kk = TagIndex;kk<strtmptmp[jjj].length;kk++) {
		      			 	             if(strtmptmp[jjj].charAt(kk) == "{") { delimcnt++ };
		      			 	             if(strtmptmp[jjj].charAt(kk) == "}") { delimcnt-- };
		      			 	             if(delimcnt==0) { break; }
		      			 	          }
		      			 	             strtmptmp[jjj] = strtmptmp[jjj].substring(0,kk)+"\\[ "+strtmptmp[jjj].substring(kk+1,strtmptmp[jjj].length);
		      			 	             TagIndex = kk+3;
		      			 	       } else { 
		      			 	          strtmptmp[jjj] = strtmptmp[jjj].substring(0,TagIndex)+"\\[ "+strtmptmp[jjj].substring(TagIndex+1,strtmptmp[jjj].length);
                                      TagIndex = TagIndex + 3;
                                   }
                                   if(TagIndex<strtmptmp[jjj].length) {
                                      tmpIndex = strtmptmp[jjj].substring(TagIndex,strtmptmp[jjj].length).search(/\\\w+/);
                                   }
		      			 	       else { 
		      			 	          tmpIndex = -1 };
		      			 	       TagIndex += tmpIndex;
		      			 	    }

	     	           	 
                                strtmptmp[jjj] = strtmptmp[jjj].replace(/\\\\\s*\\\\/g,"\\\\");
				         		strtmptmp[jjj] = strtmptmp[jjj].replace(/\\\\/g," \\[br\\] \\[ ");
						 		strtmptmp[jjj] = strtmptmp[jjj].replace(/\\label\s*\{\s*(\w+)\s*\}/g," \\[label\\]$1\\[ ");			 
						 		var strlbls = strtmptmp[jjj].split("\\[");
                                
                         		for(var jj=0;jj<strlbls.length;jj++) {
                         		   if(jj % 2) { //odd = labels, boldface, and breaks
						 		     var strtmparray = strlbls[jj].split("\\]");
						              switch(strtmparray[0]) {
								        case "textcolor":
        		                            var nodeTmp = document.createElement("span"); 
        		                            nodeTmp.className = 'LaTeXColor';
										    if(IsColorName.test(strtmparray[1].toLowerCase())) {
   										       nodeTmp.style.color=LaTeXColor[strtmparray[1].toLowerCase()];
										    } else { 
										       nodeTmp.style.color=strtmparray[1];
        		                            };
        		                            nodeTmp.appendChild(document.createTextNode(strtmparray[2]));
        		                            newFrag.appendChild(nodeTmp);                                                                                      
        		                         break;
        		                         case "colorbox":
        		                            var nodeTmp = document.createElement("span"); 
        		                            nodeTmp.className = 'LaTeXColor';
										    if(IsColorName.test(strtmparray[1].toLowerCase())) {
   										       nodeTmp.style.background=LaTeXColor[strtmparray[1].toLowerCase()];
										    } else { 
										       nodeTmp.style.background=strtmparray[1];
        		                            };
        		                            nodeTmp.appendChild(document.createTextNode(strtmparray[2]));
        		                            newFrag.appendChild(nodeTmp);                                                                                      
        		                         break;
        		                         case "br":
								            newFrag.appendChild(document.createElement("br"));                                                                                                                  
   								         break;
					    			     case "label" :
								           var nodeTmp = document.createElement("a");
								            nodeTmp.className = 'LaTeXMathMLlabel';
								            var lblid = strtmparray[1].match(/\s*(\w+)\s*/); 
								            if(lblid != null) { nodeTmp.id = lblid[1] };
								            nodeTmp.style.display = "none";
								            
                                            LaTeXCounter['label']++;
                                            var lblnum = makeNumberString(LaTeXCounter['label']);
				 				            
								            var anchorSpan = document.createElement("span");
								            anchorSpan.className = 'LaTeXMathMLlabel';
								            anchorSpan.appendChild(document.createTextNode(lblnum));
								            anchorSpan.style.display="none";
								            nodeTmp.appendChild(anchorSpan);
								            newFrag.appendChild(nodeTmp);					            
								         break;
        		                         default :
        		                            var nodeTmp = document.createElement("span"); 
        		                            nodeTmp.className = strtmparray[0];
        		                            nodeTmp.appendChild(document.createTextNode(strtmparray[1]))
        		                            newFrag.appendChild(nodeTmp);                                                                                      
					 			       }
							         } else {
				     		         newFrag.appendChild(document.createTextNode(strlbls[jj]));
					 			   }
					 			}
					 	   }
					 	}
		      		} // end else for even splits of strtmp
		  		 }
	           } 
            }; //else sections and labels
            TheBody.parentNode.replaceChild(newFrag,TheBody); 
         } //str nodevalue is not empty
      }
   } // split off recursion
   return TheBody;
}

function LaTeXDivsAndRefs(thebody) {
   var TheBody = thebody;

   var EndDivClass = null; 
   var AllDivs = TheBody.getElementsByTagName("div");
   var lbl2id = "";
   var lblnode = null;
   for(var i=AllDivs.length-1;i>=0;i--) {
      EndDivClass = AllDivs[i].className.match(/end\w+/ ); 
      if(EndDivClass!=null) {
         EndDivClass = EndDivClass[0]; 
	 var DivClass = EndDivClass.substring(3,EndDivClass.length);
         var EndDivNode = AllDivs[i];
         break; 
      } 
   }  
   while(EndDivClass!=null) {
      // TrackBack to Beginning, appending to newfrag as we go
      var newFrag = document.createDocumentFragment();
      var RootNode = EndDivNode.parentNode;
      var ClassCount = 1; // because of EndDivNode
      while(EndDivNode.previousSibling!=null && ClassCount>0) {
	 switch(EndDivNode.previousSibling.className) {
	    case EndDivClass:	 
	       ClassCount++;
	       newFrag.insertBefore(EndDivNode.previousSibling,newFrag.firstChild);
	       break;
	    case DivClass: 
	       if(EndDivNode.previousSibling.nodeName=="DIV") { 
	          ClassCount-- ;
		  //Must check to see if we need a label here!
		 if(lbl2id !="" ) { 
		    EndDivNode.previousSibling.id = lbl2id;
		    lbl2id = "" 
		 }
		 if(ClassCount==0) { 
	             RootNode = EndDivNode.previousSibling; 
		  } else {
	             newFrag.insertBefore(EndDivNode.previousSibling,newFrag.firstChild);
		  }
	       };
	       break;
           case 'LaTeXMathMLlabel':
               lbl2id = EndDivNode.previousSibling.id; 
	          EndDivNode.parentNode.removeChild(EndDivNode.previousSibling);
	       break;
	    default:
	       newFrag.insertBefore(EndDivNode.previousSibling,newFrag.firstChild);
            }
      }
      RootNode.appendChild(newFrag);
      EndDivNode.parentNode.removeChild(EndDivNode);
      
      //Look for more end div items
      AllDivs = TheBody.getElementsByTagName("DIV");
      for(i=AllDivs.length-1;i>=0;i--) {
         EndDivClass = AllDivs[i].className.match(/end\w+/ );
         if(EndDivClass!=null) {
	    ClassCount = 0;
            EndDivClass = EndDivClass[0]; 
	    DivClass = EndDivClass.substring(3,EndDivClass.length);
            EndDivNode = AllDivs[i];
	    RootNode = EndDivNode.parentNode;
            break; 
         } 
       }     
   } // end while!
   
   

   
   var AllDivs = TheBody.getElementsByTagName("div"); //Convert itemize and enumerate to html lists:
   var DIV2LI = null;
   
   for(var i=0;i<AllDivs.length;i++) {
      if( AllDivs[i].className=="itemize" || AllDivs[i].className=="enumerate" || AllDivs[i].className=="description")  { 
 	    if(AllDivs[i].className=="itemize") { 
		RootNode = document.createElement("UL");
            } else { 
		RootNode = document.createElement("OL");
            }
	    RootNode.className = 'LaTeXMathML';
	    if(AllDivs[i].hasChildNodes()) { AllDivs[i].removeChild(AllDivs[i].firstChild) };
	    while(AllDivs[i].hasChildNodes()) {
	       if(AllDivs[i].firstChild.hasChildNodes()) { 
		      DIV2LI = document.createElement("LI");
		   while(AllDivs[i].firstChild.hasChildNodes()) {
		      DIV2LI.appendChild(AllDivs[i].firstChild.firstChild);
		  }
		  if(DIV2LI.firstChild.className=="listitemmarker") {
		     DIV2LI.style.listStyleType = "none"; 
	          }
		  RootNode.appendChild(DIV2LI)
	       }
	       AllDivs[i].removeChild(AllDivs[i].firstChild);
            }
	    AllDivs[i].appendChild(RootNode);
      }
   }
	
   // From here to 'end for AllAnchors is necessary only because CSS3 is not implemented yet.
   // Once CSS3 target-text is available, this can be done using CSS
   var AllAnchors = TheBody.getElementsByTagName("a");
   for(var i=0;i<AllAnchors.length;i++) {
      if(AllAnchors[i].className == "ref" || AllAnchors[i].className == "cite" ) {
         var label = AllAnchors[i].href.match(/\#(\w+)/); 
         if(label!=null) { 
            var labelNode = document.getElementById(label[1]);
            if(labelNode!=null) {
               var TheSpans = labelNode.getElementsByTagName("SPAN");
	       if(TheSpans!=null) { 
		  var refNode = TheSpans[0].cloneNode(true);
    	          refNode.style.display="inline"
		  refNode.className = AllAnchors[i].className;
		  AllAnchors[i].appendChild(refNode);
		  //break;
	       }       
            }
         }
      }
   } // end for AllAnchors

   // Eventually: Collapsible Sections
   
   return TheBody;
}

var AMbody;
var AMnoMathML = false, AMtranslated = false;

function translate(spanclassAM) {
  if (!AMtranslated) { // run this only once
     AMtranslated = true;
     AMinitSymbols();
     var LaTeXContainers = [];
     var AllContainers = document.getElementsByTagName('*');
     var ExtendName = "";
    
     for (var k = 0,l=0; k < AllContainers.length; k++) {
        ExtendName = " "+AllContainers[k].className+" ";        
        if(ExtendName.match(/\sLaTeX\s/)!=null) { 
           LaTeXContainers[l] = AllContainers[k];
           l++;
        }
     }; 
     if(LaTeXContainers.length>0) { 
        for(var m=0;m<LaTeXContainers.length;m++) {
           AMbody = LaTeXContainers[m];
           try {
              AMbody = LaTeXDivsAndRefs(LaTeXpreProcess(AMbody)); //
           } catch(err) { 
               alert("Unknown Error: Defaulting to Original LaTeXMathML");
           }
           if(AMbody.tagName=="PRE") {
              var PreChilds = document.createDocumentFragment();
              var DivChilds = document.createElement("DIV"); 
              while(AMbody.hasChildNodes()) {
                 DivChilds.appendChild(AMbody.firstChild);
              }
              PreChilds.appendChild(DivChilds);
              AMbody.parentNode.replaceChild(PreChilds,AMbody);
              AMbody = DivChilds; //Leaves empty pre -- may be useful??
              
           }
           AMprocessNode(AMbody, false, spanclassAM);
        }
     } else { //Default to entire page  
        AMbody = document.getElementsByTagName("body")[0];
        try {
           AMbody = LaTeXDivsAndRefs(LaTeXpreProcess(AMbody)); //
        } catch(err) { 
           alert("Unknown Error: Defaulting to Original LaTeXMathML");
        }
           AMprocessNode(AMbody, false, spanclassAM);
     }
  }
}
  
if (isIE) { 
  // avoid adding MathPlayer info explicitly to each webpage
  document.write("<object id=\"mathplayer\"\
  classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object>");
  document.write("<?import namespace=\"m\" implementation=\"#mathplayer\"?>");
}

// GO1.1 Generic onload by Brothercake
// http://www.brothercake.com/
//onload function (replaces the onload="translate()" in the <body> tag)
function generic()
{
  translate();
};
//setup onload function
if(typeof window.addEventListener != 'undefined')
{
  //.. gecko, safari, konqueror and standard
  window.addEventListener('load', generic, false);
}
else if(typeof document.addEventListener != 'undefined')
{
  //.. opera 7
  document.addEventListener('load', generic, false);
}
else if(typeof window.attachEvent != 'undefined')
{
  //.. win/ie
  window.attachEvent('onload', generic);
}
//** remove this condition to degrade older browsers
else
{
  //.. mac/ie5 and anything else that gets this far
  //if there's an existing onload function
  if(typeof window.onload == 'function')
  {
    //store it
    var existing = onload;
    //add new onload handler
    window.onload = function()
    {
      //call existing onload function
      existing();
      //call generic onload function
      generic();
    };
  }
  else
  {
    //setup onload function
    window.onload = generic;
  }

}
