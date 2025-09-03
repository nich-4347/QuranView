
// ---------------------------------------------

boxcontrol();
box();

// ---------------------------------------------

// -----------------------------------------------------------------------

function boxcontrol() {

    var out = "";

    out +=  ' <div id="titlesection"></div> ';
    out +=  ' <div id="titleplus"></div> ';

    document.getElementById("process").innerHTML = out;
}

// -----------------------------------------------------------------------

function box() {

    var out = "";

    out +=  ' <div id="tableheader"></div>  ';
    out +=  ' <div id="tablesection"></div> ';

    document.getElementById("box1").innerHTML = out;
}

// -----------------------------------------------------------------------

// ---------------------------------------------

myTitleFunction();

// ---------------------------------------------

// -----------------------------------------------------------------------

function myTitleFunction() {

    var out = "";

    out +=  '<button id="boxdisp" onclick="showhide()" type="button"> = </button>';
    document.getElementById("table").innerHTML = out;

    out =   '<button id="onepageleft"  onclick="oneturnpage(1)" type="button"> < </button>';
    out +=   '<button id="pageleft"  onclick="turnpage(1)" type="button"> << </button>';

    out +=   '<button id="playstop"  onclick="turnplay()" type="button"> (>) </button>';

    out +=  '<button id="pageright" onclick="turnpage(0)" type="button"> >> </button>';
    out +=   '<button id="onepageright"  onclick="oneturnpage(0)" type="button"> > </button>';

    document.getElementById("scroll").innerHTML = out;


    out =   '<select name="zoom" id="zoom" onchange="selectZoom(this)">';
    out +=  '<option value="75">75%</option><option value="100" selected>100%</option><option value="150">150%</option><option value="200">200%</option><option value="250">250%</option>';
    out +=  '</select>';
    document.getElementById("zoom").innerHTML = out;

    out =  '<button id="pagespage" onclick="pagepages()" type="button"> || | </button>';
    document.getElementById("navbar").innerHTML = out;

    out =   '<select name="ver" id="ver" onchange="setver(this)">';
    out +=  '<option value="0" selected>Parks</option><option value="1">Roses</option>';
    out +=  '</select>';
    document.getElementById("option").innerHTML = out;


    out =  '<span id="titlebar">';
    out += '<button onclick="buildSurahTable()" type="button"> Surah</button>';
    out += '<button onclick="buildAll()" type="button">Juz</button>';
    out += '</span>'
    out += '<span> <input type="radio" name="option" onclick="radioselect(this)" checked /> (>)<span>'

    document.getElementById("titlesection").innerHTML = out;
}

// -----------------------------------------------------------------------

function showhide() {

    if (show == 1){
        document.getElementById("boxdisp").innerHTML = " x ";
        document.getElementById("nav").removeAttribute("hidden");
    show = 0;
    } else {
        document.getElementById("boxdisp").innerHTML = " = ";
        document.getElementById("nav").setAttribute("hidden","");
    show = 1;
    }
}

// -----------------------------------------------------------------------

function pagepages() {
    if (pagemode == 1){
        document.getElementById("pagespage").innerHTML = " || | ";

        document.getElementById("pageleft").innerHTML = " << ";
        document.getElementById("pageright").innerHTML = " >> ";

        document.getElementById("onepageleft").removeAttribute("hidden");
        document.getElementById("onepageright").removeAttribute("hidden");

        document.getElementById("pages").removeAttribute("hidden");
        document.getElementById("singlepage").setAttribute("hidden","");

        pagemode = 0;
    } else {
        document.getElementById("pagespage").innerHTML = " \[ | \] ";

        document.getElementById("pageleft").innerHTML = " < ";
        document.getElementById("pageright").innerHTML = " > ";

        document.getElementById("onepageleft").setAttribute("hidden","");
        document.getElementById("onepageright").setAttribute("hidden","");

        document.getElementById("singlepage").removeAttribute("hidden");
        document.getElementById("pages").setAttribute("hidden","");
        pagemode = 1;
    }

 setImageSrc();
}

// -----------------------------------------------------------------------

// ---------------------------------------------

document.getElementById("nav").setAttribute("hidden","");

var pagemode = 0;
var show = 1;

var playonclick = 1;

buildSurahTable(SurahTable);

// ---------------------------------------------


// ******************************************************

// Build Surah Table

// ******************************************************

// -----------------------------------------------------------------------

function buildSurahTable() {

    var i;
    var surahnumber;

    var out = "";

    out += '<table class="common">';
    out += "<tr> <th></th> <th></th> <th></th> <th></th></tr>";

    // Rows

    for(i = 0; i < SurahTable.length; i++) {

        surahnumber = i+1;

        if (SurahTable[surahnumber-1].page == 0) {break;}

        out += '<tr>';
        out += '<td>' + surahnumber + '</td>';
        out += '<td>' + SurahTable[i].Surah + '</td>';
        out += '<td>' + SurahTable[i].page  + '</td>';
        out += '<td>' +  '<button onclick="buildSurah('+i+')" type="button">.</button>' + '</td>';
        out += '</tr>';

    }

    out += '</table>';

    document.getElementById("titleplus").innerHTML = '<p><b><u>Surah</u></b></p>';
    document.getElementById("tableheader").innerHTML = '';
    document.getElementById("tablesection").innerHTML = out;

}

// -----------------------------------------------------------------------


// ******************************************************

// Build Juz Table

// ******************************************************

// -----------------------------------------------------------------------

function buildAll () {

    var first = {"juz" : 1, "sect" : 0, "page" : 1}
    var last  = {"juz" : 1, "sect" : 0, "page" : 1}


    first.juz = 1;
    first.sect = 0;
    first.page = 1;

    var tmpval;

    last.juz = (quarterhizbpage.length / 8 | 0);
    last.sect = 7;
    // last.juz = quarterhizbpage.length % 8;

    last.page = pagetime.length;

    document.getElementById("titleplus").innerHTML = "<p><b><u>Juz'</u></b></p>";
    document.getElementById("tableheader").innerHTML = '';

    myTableFunction(first, last);

}

// -----------------------------------------------------------------------


// ******************************************************

// Build Surah

// ******************************************************

// -----------------------------------------------------------------------

function buildSurah (surahtablenumber) {


    var first = {"juz" : 1, "sect" : 0, "page" : 1}
    var last  = {"juz" : 1, "sect" : 0, "page" : 1}


    var out = "";
    var startbutton = "";

    var surahnumber = surahtablenumber+1;
    var juz = SurahTable[surahtablenumber].Juz;
    var sect = SurahTable[surahtablenumber].Sect;
    var page = SurahTable[surahtablenumber].page;
    var time = SurahTable[surahtablenumber].time;


    var nexttime;
    var incr = surahtablenumber+1;

    first.juz = juz;
    first.sect = sect;
    first.page = page;

    if (surahtablenumber < SurahTable.length-1){
      last.juz = SurahTable[incr].Juz;
      last.sect = SurahTable[incr].Sect;
      last.page = SurahTable[incr].page;

    } else {
      last.juz  = (quarterhizbpage.length / 8 | 0);
      last.sect = 7;
      // last.sect = quarterhizbpage.length % 8;
      last.page = pagetime.length;
    }

    out +=  '<p>';
    out +=  '<span><b>' + surahnumber + ' Surah ' +  SurahTable[surahtablenumber].Surah + ' </b></span>';
    out +=  '</p>';

    document.getElementById("titleplus").innerHTML = out;

    var min;
    var sec;
    var formattedtime;

    min = Math.floor(time / 60);
    sec = time % 60;
    formattedtime = min+'m'+sec+'s';

    var quarter;
    quarter = (juz-1) * 8 + sect;

    startbutton +=  '<p style="width: 97%;">';
    startbutton +=  '<button onclick="onClickStartButton('+quarter+','+page+','+time+')" type="button" style="float: right;">start</button>';
    startbutton +=  '<span style="float: right;"> - </span>';
    startbutton +=  '<span style="float: right;"> ' + formattedtime + ' </span>';
    startbutton +=  '</p><br></br>';

    document.getElementById("tableheader").innerHTML = startbutton;

    myTableFunction(first, last);

}

// -----------------------------------------------------------------------

function onClickStartButton (quarter, page, time){

    buttonFunction(quarter, page);

       if(isplaying == 1) {
        setTime(time);
       }
}

// -----------------------------------------------------------------------


// ******************************************************

// Juz Table

// ******************************************************

// -----------------------------------------------------------------------

function myTableFunction(first, last) {

    var quarter;
    var page;

    var startofhizb;
    var endofhizb;

    var lastquarter = (last.juz-1) * 8 + last.sect;

    var next;

    let l = 0;

    var juz,hizb;
    var min,sec,timeminsec;

    var displayhizb = "";

    var out = "";

    out += '<table width="97%">';
    out += '<tr bgcolor="#0099ff"><th></th><th style="width: 25px;"></th><th style="width: 29px;"></th><th></th></tr>';

    // - Juz  -

     for(i = first.juz-1; i <= last.juz-1; i++) {

        juz = i+1;
        hizb = i*2+1;

        quarter = i*8;

        if (quarterhizbpage[quarter].page==0 || quarterhizbpage[quarter+1].page==0){break;}

        out += '<tr>';
        out += '<td style="border-bottom-style:solid;border-bottom-width:1px">'+"Juz' " + juz + '</td>';
        out += '<td style="border-bottom-style:solid;border-bottom-width:1px"></td>';
        out += '<td style="border-bottom-style:solid;border-bottom-width:1px"></td>';
        out += '<td style="border-bottom-style:solid;border-bottom-width:1px"></td>';
        out += '</tr>';

        // - Trim quarters -

        if (i == first.juz-1){
            startofhizb = first.sect;
            endofhizb = 8;
        } else if (i == last.juz-1) {
            startofhizb = 0;
            endofhizb = last.sect+1;
        } else {
          startofhizb = 0;
          endofhizb = 8;
        }

        // - Juz Hizb Qurarters -

        for(j = startofhizb; j < endofhizb; j++) {

          quarter = i*8 + j;

          if (quarter > lastquarter || quarter >= quarterhizbpage.length){
          break;
          }

          // - Set start page -

          page = quarterhizbpage[quarter].page;
          if (page==0){break;}

          if (i == first.juz-1 && j == startofhizb && page != first.page){
          l = first.page;
          } else {
            l = page + 1;
          }

          // - Enumerate hizb  -

          if (j == 0){
          displayhizb = "" + hizb;
          } else if (j == 4){
          hizb++;
          displayhizb = "" + hizb;
          } else {
          displayhizb = "";
          }

          var symbol = quarter % 4;

          out += '<tr bgcolor="#D6EEEE">';
          out += '<td>' + 0 + 's</td>';

          out += '<td>' + displayhizb + '</td>';
          out += '<td bgcolor="#0099ff"><button onclick="buttonFunction(' + quarter + ', ' + page + ')" type="button">'+sectSymbol(symbol)+'</button></td>';
          out += '<td>pg. ' +  page + '</td>';
          out += '</tr>';

          if (first.page > page+1){
            out += '<tr>';
            out += '<td></td>';
            out += '<td></td>';
            out += '<td></td>';
            out += '<td>...</td>';
            out += '</tr>';
          }

          // - Set end page -

          next = quarter+1;
          var nextpage;

          if (next < quarterhizbpage.length){
            if (quarterhizbpage[next].page == 0) {break;}
            nextpage = quarterhizbpage[next].page;
          } else {
            nextpage = pagetime.length;
          }

          if (i == last.juz-1 && j == last.sect) {
            nextpage = last.page;
          }

          // - Pages -

          while (l <= pagetime.length && l <= nextpage) {

            page = l;

            if (pagetime[l-1].time != 0) {

            min = Math.floor(pagetime[l-1].time / 60);
            sec = pagetime[l-1].time % 60;
            timeminsec = min+'m'+sec+'s';

              out += '<tr>';
              out += '<td>' + timeminsec + '</td>';
              out += '<td></td>';
              out += '<td><button onclick="buttonFunction(' + quarter + ', ' + page + ')" type="button">.</button></td>';

              out += '<td>pg. ' +  page + '</td>';
              out += '</tr>';
            }

            l++;

            }

            if (quarterhizbpage[quarter+2].page==0){break;}

        }
    }
    document.getElementById("tablesection").innerHTML = out;

}

// -----------------------------------------------------------------------


// ******************************************************

// Utility

// ******************************************************

// -----------------------------------------------------------------------

function sectSymbol(sect){

    var symbtxt;

    switch (sect){
      case 0:
        symbtxt = '&#11044';
      break;
      case 1:
        symbtxt = '&#9684';
      break;
      case 2:
        symbtxt = '&#9681';
      break;
      case 3:
        symbtxt = '&#9685';
      break;
      case 4:
        symbtxt = '&#11044';
      break;
      case 5:
        symbtxt = '&#9684';
      break;
      case 6:
        symbtxt = '&#9681';
      break;
      case 7:
        symbtxt = '&#9685';
      break;
    }
    return symbtxt;
}

// -----------------------------------------------------------------------

function hizbStr(juz,sect){

    var hizbtxt;

    let h0 = 2 * juz - 1;
    let h1 = 2 * juz;


    switch (sect){
      case 0:
        hizbtxt = '' + ' Hizb' + h0;
      break;
      case 1:
        hizbtxt = '&#188' + ' Hizb ' + h0;
      break;
      case 2:
        hizbtxt = '&#189' + ' Hizb ' + h0;
      break;
      case 3:
        hizbtxt = '&#190' + ' Hizb ' + h0;
      break;
      case 4:
        hizbtxt = '' + ' Hizb ' + h1;
      break;
      case 5:
        hizbtxt = '&#188' + ' Hizb ' + h1;
      break;
      case 6:
        hizbtxt = '&#189' + ' Hizb ' + h1;
      break;
      case 7:
        hizbtxt = '&#190' + ' Hizb ' + h1;
      break;
    }
    return hizbtxt;

}

// -----------------------------------------------------------------------


// ******************************************************

//  On-Click

// ******************************************************

// ---------------------------------------------

var currentquart = 0;
let audset = 0;

var isplaying = 0;

// ---------------------------------------------

// -----------------------------------------------------------------------

function buttonFunction(quarter,page) {

    var str;
    var q = {"juz" : 1, "sect" : 0}

    q.juz  = (quarter / 8 | 0) + 1;
    q.sect = quarter - (q.juz-1)*8;

    str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';

    if (playonclick == 1){

      isplaying = 1;

    if (audset == 1) {

      if (quarter != currentquart){
        str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';
        setAudioSrc(str);
        currentquart = quarter;
      }

    } else {
      currentquart = quarter;
      str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';
      audset=1;
      setAudioSrc(str);
    }

    document.getElementById("playstop").innerHTML = " ([]) ";

    currpage = page;

    if (currpage != quarterhizbpage[currentquart].page){
      setTime(pagetime[page-1].time);
    } else {
      setTime(0);
    }

    document.getElementById("page").innerHTML = 'p. '+currpage+" Juz' "+q.juz+', '+hizbStr(q.juz,q.sect);

    } else {

      isplaying = 0;
      audset = 0;

      currpage = page;

      document.getElementById("page").innerHTML = 'p. '+currpage;

    }

    setImageSrc();

}

// -----------------------------------------------------------------------

function buttonFunction2(quarter,page) {

  var str;
  var q = {"juz" : 1, "sect" : 0}

  q.juz  = (quarter / 8 | 0) + 1;
  q.sect = quarter - (q.juz-1)*8;

  str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';

    isplaying = 1;

    if (audset == 1) {

      if (quarter != currentquart){
        str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';
        setAudioSrc(str);
        currentquart = quarter;
      }

    } else {
      currentquart = quarter;
      str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';
      audset=1;
      setAudioSrc(str);
    }

    document.getElementById("playstop").innerHTML = " ([]) ";

    currpage = page;

    if (currpage != quarterhizbpage[currentquart].page){
      setTime(pagetime[page-1].time);
    } else {
      setTime(0);
    }

  setImageSrc();

}

// -----------------------------------------------------------------------

function radioselect (radio) {


  if (isplaying == 1){
    turnplay();
  }

  if (playonclick == 1) {
    radio.checked = false; // Uncheck the radio button
    playonclick = 0;
  } else {
    radio.checked = true;
    playonclick = 1;
  }
}

// -----------------------------------------------------------------------

// ---------------------------------------------

var zoomlevel = 100;

// ---------------------------------------------

// -----------------------------------------------------------------------

function selectZoom (select) {

  var txtvalue = "" + select.value + "%"

  if (select.value !== zoomlevel){
        document.getElementById("pages").style.width = txtvalue;
        document.getElementById("singlepage").style.width = txtvalue;
  }
}

// -----------------------------------------------------------------------

// ---------------------------------------------

var version = 0;

var hizbmargimg1dir = './custom/example/Marg-Juz.png';
var hizbmargimg2dir = './custom/example/Marg-Hizb.png';
var hizbmargimg3dir = './custom/example/Marg-Quarter.png';
var hizbimgdir      = './custom/example/hizb.png';
var correctionimgdir = './custom/example/correction.png';

var borderimgdir = './custom/example/border.png';
var Aimgdir      = './custom/example/Number.png';
var titleimgdir  = './custom/example/title.png';

// ---------------------------------------------

// -----------------------------------------------------------------------

function setver(select) {

  var txtvalue = "" + select.value + "%"

  if (select.value !== version){

    version = select.value;

    if (version == 0){
      hizbmargimg1dir  = './custom/example/Marg-Juz.png';
      hizbmargimg2dir  = './custom/example/Marg-Hizb.png';
      hizbmargimg3dir  = './custom/example/Marg-Quarter.png';
      hizbimgdir       = './custom/example/hizb.png';
      correctionimgdir = './custom/example/correction.png';

      borderimgdir     = './custom/example/border.png';
      Aimgdir          = './custom/example/Number.png';
      titleimgdir      = './custom/example/title.png';


    } else {
      hizbmargimg1dir  = './custom/newver/Juz-web.png';
      hizbmargimg2dir  = './custom/newver/Hizb-web.png';
      hizbmargimg3dir  = './custom/newver/Quarter-web.png';
      hizbimgdir       = './custom/newver/Hizbmark-web.png';
      correctionimgdir = './custom/newver/Correction-web.png';

      borderimgdir     = './custom/newver/ver_1.png';
      Aimgdir          = './custom/newver/Number.png';
      titleimgdir      = './custom/newver/Title-web.png';
    }

    if (isplaying == 1){
      turnplay();
    }
      setImageSrc();
  }
}

// -----------------------------------------------------------------------


