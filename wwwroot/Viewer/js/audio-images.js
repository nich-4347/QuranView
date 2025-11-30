

// ---------------------------------------------

var currpage = 1;

imagecontrol();

// ---------------------------------------------


// ******************************************************

//  HTML

// ******************************************************

// -----------------------------------------------------------------------

function imagecontrol() {


    var out = "";

    out =  '<div id="imagebox" class="imageboxstyle">';
    out +=  '<img id="myImage2" class="image" width="1166" height="754"  alt="Page" src="./custom/Empty-full.png">';
    out += '</div>';

    out += '<canvas id="myCanvas2" class="canvas" width="1166" height="754">Canvas</canvas>';

    document.getElementById("box3").innerHTML = out;

    document.getElementById("singlepage").setAttribute("hidden","");


    out =  '<div  class="imageboxstyle">';
    out += '<img  class="image" width="583" height="754"  alt="Page" src="./custom/Empty-half.png">';
    out += '</div>';

    out += '<canvas id="myCanvas0" class="canvasPage" width="583" height="754">Canvas</canvas>';

    document.getElementById("box4").innerHTML = out;
}

// -----------------------------------------------------------------------


// ******************************************************

//  Set Image

// ******************************************************

// ---------------------------------------------

var currbookpage = 1;

var image1 = document.getElementById("myImage1");
var image2 = document.getElementById("myImage2");

var image = document.getElementById("myImage");

// ---------------------------------------------

// -----------------------------------------------------------------------

function setImageSrc() {

    var o;
    let page = currpage;

    var oddpage = currbookpage;


    if (page < 10){
      o = "00";
    }else if (page < 100){
      o = "0";
    } else {
      o = "";
    }

    var nextpage = currpage+1;
    if (nextpage < 10){
      onext = "00";
    }else if (nextpage < 100){
      onext = "0";
    } else {
      onext = "";
    }    var nextpagestring = imagedir + onext + nextpage + ".png";

    var prevpage = currpage-1;
    if (prevpage < 10){
      oprev = "00";
    }else if (prevpage < 100){
      oprev = "0";
    } else {
      oprev = "";
    }

    var string = imagedir + o + currpage + "-" + onext + nextpage + ".png";
    var prevpagestring = imagedir + oprev + prevpage + "-" + o + currpage + ".png";
    var endpagestring = imagedir + "001-002" + ".png";
    var lastpage = pagetime.length;

    if (pagemode == 0){
      if (currpage % 2 !== 0) {
        if (nextpage <= lastpage) {
          setCanvasNew(string);
          bookpage = currpage;
        } else {
          setCanvasNew(string);
        }
      } else if (currpage % 2 === 0) {
          if (currpage - oddpage !== 1) {
            setCanvasNew(prevpagestring);
            bookpage = prevpage;
          } else {
            setCanvasNew(prevpagestring);
            bookpage = 1;
          }
      }
    } else {

      if (currpage % 2 !== 0) {
        setCanvasPage(string);
      } else {
        setCanvasPage(prevpagestring);
      }
    }

}

// -----------------------------------------------------------------------

function setImageSrc2(string, nextpagestring) {

    //image1

    image2.src = string;
    image2.load
}

// -----------------------------------------------------------------------

function setImageSrc1(string) {

    image.src = string;
    image.load

}

// -----------------------------------------------------------------------

// ---------------------------------------------

setCanvasNew(imagedir+"001-002.png");

// ---------------------------------------------

// -----------------------------------------------------------------------

function setimglocation (line, d){

  var verthalf = 754/2;
  var horzhalf = 1166/2 -14;

  var vertscale = 269.863;
  var horzscale = 270.032;

  var vertincr = 0.147*vertscale;


  var linepx =  verthalf - ((8.5-line) * vertincr);
  var dpx = horzhalf + (d * horzscale);

  return [linepx,dpx];

}

// -----------------------------------------------------------------------

function setimglocationsingle (line, d){

  var verthalf = 754/2 + 4;
  var horzhalf = 1166/2 -14;

  var vertscale = 269.863;
  var horzscale = 270.032;

  var vertincr = 0.147*vertscale;


  var linepx =  verthalf - ((8.5-line) * vertincr);
  linepx = linepx-4;

  var dpx = 0;

  if (d < 0){
    dpx = horzhalf + (d * horzscale);
  } else {
    dpx = d * horzscale - 14;
  }

  return [linepx,dpx];
}

// -----------------------------------------------------------------------

function setCanvasNew(string){

  var c2 = document.getElementById("myCanvas2");
  var ctx2 = c2.getContext("2d");


  ctx2.fillStyle = "#fff9f5";

  ctx2.fillRect(0,0,1166,754);


  ctx2.strokeStyle = "rgb(211, 211, 211)";

  // Define a new path
  ctx2.beginPath();
  // Set a start-point
  ctx2.moveTo(583, -6);
  // Set an end-point
  ctx2.lineTo(583, 829);
  // Stroke it (Do the Drawing)
  ctx2.stroke();

  var borderimg = new Image();
  borderimg.addEventListener("load", (e) => {
    ctx2.drawImage(borderimg, 0, 0);
    ctx2.drawImage(borderimg, 583, 0);
  });
  borderimg.src = borderimgdir;

  var rpage = 0;
  if (currpage % 2 !== 0) {
    rpage = currpage;
  }else{
    rpage = currpage-1;
  }

  var i = 1;
  var zed = 0;

  var Aimg = new Image();
  Aimg.addEventListener("load", (e) => {

    for (i = 1; i <= 14; i++) {
      eval('zed = pagetime[rpage-1].A'+i+'_l');
      if (zed != 0){
        eval('[y, x] = setimglocation(pagetime[rpage-1].A'+i+'_l, pagetime[rpage-1].A'+i+'_d);');
        ctx2.drawImage(Aimg, x, y);
      }
    }
    for (i = 1; i <= 14; i++) {
      eval('zed = pagetime[rpage].A'+i+'_l');
      if (zed != 0){
        eval('[y, x] = setimglocation(pagetime[rpage].A'+i+'_l, pagetime[rpage].A'+i+'_d);');
        ctx2.drawImage(Aimg, x, y);
      }
    }
  });
  Aimg.src = Aimgdir;

  var titleimg = new Image();
  titleimg.addEventListener("load", (e) => {
    i = 0;

    do {
      if (SurahTable[i].page == rpage){
        [y, x] = setimglocation(SurahTable[i].line+0.14, 0.36);
        ctx2.drawImage(titleimg, x, y);
      }
      i++;
    } while (SurahTable[i].page <= rpage);

    i = 0;
    do {
      if (SurahTable[i].page == rpage+1){
        [y, x] = setimglocation(SurahTable[i].line+0.14, -1.805);
        ctx2.drawImage(titleimg, x, y);
      }
      i++;
    } while (SurahTable[i].page <= rpage+1);
  });
  titleimg.src = titleimgdir;


  var hizbmargimg1 = new Image();
  var hizbmargimg2 = new Image();
  var hizbmargimg3 = new Image();
  var hizbimg      = new Image();
  var correctionimg = new Image();

  var hizbtype = 0;
  var corr = 0;
  var mark = 0;


  hizbmargimg1.addEventListener("load", (e) => {
  i = 0;
    do {
      if (quarterhizbpage[i].page == rpage){
        [y, x] = setimglocation(quarterhizbpage[i].hizb_line-1.35, 2.055);
        hizbtype = quarterhizbpage[i].hizb_type;
        [y_h, x_h] = setimglocation(quarterhizbpage[i].hizb_line, quarterhizbpage[i].mark_d);
        [y_c, x_c] = setimglocation(quarterhizbpage[i].hizb_line, quarterhizbpage[i].corr_d);
        if (quarterhizbpage[i].mark_d != 0){mark = 1}
        if (quarterhizbpage[i].corr_d != 0){corr = 1}
      } else if (quarterhizbpage[i].page == rpage+1){
        [y, x] = setimglocation(quarterhizbpage[i].hizb_line-1.35,-2.085);
        hizbtype = quarterhizbpage[i].hizb_type;
        [y_h, x_h] = setimglocation(quarterhizbpage[i].hizb_line, quarterhizbpage[i].mark_d);
        [y_c, x_c] = setimglocation(quarterhizbpage[i].hizb_line, quarterhizbpage[i].corr_d);
        if (quarterhizbpage[i].mark_d != 0){mark = 1}
        if (quarterhizbpage[i].corr_d != 0){corr = 1}
      }
      i++
    // } while (quarterhizbpage[i].page <= rpage+1 && quarterhizbpage[i].page != 0);
    } while (i < quarterhizbpage.length && quarterhizbpage[i].page <= rpage+1 && quarterhizbpage[i].page != 0);

      if (hizbtype == 1){
        ctx2.drawImage(hizbmargimg1, x, y+10);
      }
  });

    hizbmargimg2.addEventListener("load", (e) => {
      if (hizbtype == 2){
        ctx2.drawImage(hizbmargimg2, x, y);
      }
    });
    hizbmargimg3.addEventListener("load", (e) => {
      if (hizbtype == 3){
        ctx2.drawImage(hizbmargimg3, x, y);
      }
    });
    hizbimg.addEventListener("load", (e) => {
      if (mark != 0){
        ctx2.drawImage(hizbimg, x_h+6, y_h+5);
      }
    });
    correctionimg.addEventListener("load", (e) => {
      if (corr != 0){
        ctx2.drawImage(correctionimg, x_c, y_c);
      }
    });

    hizbmargimg1.src =  hizbmargimg1dir;
    hizbmargimg2.src =  hizbmargimg2dir;
    hizbmargimg3.src =  hizbmargimg3dir;
    hizbimg.src      =  hizbimgdir;
    correctionimg.src = correctionimgdir;

    var img = new Image();

    img.addEventListener("load", (e) => {
      ctx2.drawImage(img, 0, 0);
    });
    img.src = '' + string;

}

// -----------------------------------------------------------------------

function setCanvasPage(string){

  var c2 = document.getElementById("myCanvas0");
  var ctx = c2.getContext("2d");

  var cropWidth = 583;
  var cropHeight =754;

  c2.width = cropWidth;
  c2.height = cropHeight;


  ctx.fillStyle = "#fff9f5";

  ctx.fillRect(0,0,583,754);

  var cropX = 0;
  var cropY = 0;


  if (currpage % 2 !== 0) {
    cropX = 583;
  }

  var k = "A";
  var i = 1;
  var zed = 1;

    var borderimg = new Image();
    borderimg.addEventListener("load", (e) => {
      ctx.drawImage(borderimg, 0, 0);
    });
    borderimg.src = borderimgdir;


    var titleimg = new Image();
    titleimg.addEventListener("load", (e) => {
      i = 0;

      do {
        if (SurahTable[i].page == currpage){

          [y, x] = setimglocationsingle(SurahTable[i].line+0.14, 0.36);
          ctx.drawImage(titleimg, x, y);
        }
        i++;
      } while (SurahTable[i].page <= currpage);
    });
    titleimg.src = titleimgdir;

    var hizbmargimg1 = new Image();
    var hizbmargimg2 = new Image();
    var hizbmargimg3 = new Image();
    var hizbimg      = new Image();
    var correctionimg = new Image();

    var hizbtype = 0;
    var corr = 0;
    var mark = 0;

    i = 0;
    do {
      if (quarterhizbpage[i].page == currpage){
        if (currpage % 2 !== 0){
          [y, x] = setimglocationsingle(quarterhizbpage[i].hizb_line-1.35, 2.055);
          [y_h, x_h] = setimglocationsingle(quarterhizbpage[i].hizb_line, quarterhizbpage[i].mark_d);
          [y_c, x_c] = setimglocationsingle(quarterhizbpage[i].hizb_line, quarterhizbpage[i].corr_d);
          if (quarterhizbpage[i].mark_d != 0){mark = 1}
          if (quarterhizbpage[i].corr_d != 0){corr = 1}
        } else{
          [y, x] = setimglocationsingle(quarterhizbpage[i].hizb_line-1.35, -2.085);
          [y_h, x_h] = setimglocationsingle(quarterhizbpage[i].hizb_line, quarterhizbpage[i].mark_d);
          [y_c, x_c] = setimglocationsingle(quarterhizbpage[i].hizb_line, quarterhizbpage[i].corr_d);
          if (quarterhizbpage[i].mark_d != 0){mark = 1}
          if (quarterhizbpage[i].corr_d != 0){corr = 1}
        }
        hizbtype = quarterhizbpage[i].hizb_type;
      }
      i++
    } while (i < quarterhizbpage.length && quarterhizbpage[i].page <= currpage && quarterhizbpage[i].page != 0);

    hizbmargimg1.addEventListener("load", (e) => {

    if (hizbtype == 1){
        ctx.drawImage(hizbmargimg1, x, y);
      }

    });

    hizbmargimg2.addEventListener("load", (e) => {
      if (hizbtype == 2){
        ctx.drawImage(hizbmargimg2, x, y);
      }
    });
    hizbmargimg3.addEventListener("load", (e) => {
      if (hizbtype == 3){
        ctx.drawImage(hizbmargimg3, x, y);
      }
    });
    hizbimg.addEventListener("load", (e) => {
      if (mark != 0){
        ctx.drawImage(hizbimg, x_h, y_h+5);
      }
    });
    correctionimg.addEventListener("load", (e) => {
      if (corr != 0){
        ctx.drawImage(correctionimg, x_c, y_c);
      }
    });

    hizbmargimg1.src =  hizbmargimg1dir;
    hizbmargimg2.src =  hizbmargimg2dir;
    hizbmargimg3.src =  hizbmargimg3dir;
    hizbimg.src      =  hizbimgdir;
    correctionimg.src = correctionimgdir;

    var A1img = new Image();
    A1img.addEventListener("load", (e) => {

      for (i = 1; i <= 14; i++) {
        eval('zed = pagetime[currpage-1].A'+i+'_l');
        if (zed != 0){
          eval('[y, x] = setimglocationsingle(pagetime[currpage-1].A'+i+'_l, pagetime[currpage-1].A'+i+'_d);');
          ctx.drawImage(A1img, x, y);
        }
      }

      });
    A1img.src = Aimgdir;

    var img = new Image();
    img.addEventListener("load", (e) => {
      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight,0, 0, cropWidth, cropHeight);
    });
    img.src = '' + string;

}

// -----------------------------------------------------------------------


// ******************************************************

//  Set Audio

// ******************************************************


// ---------------------------------------------

audio();

// ---------------------------------------------

// -----------------------------------------------------------------------

function audio() {

    var out = "";

    out +=  '<span id="page"></span><br>'
    out +=  '<audio controls id="myAudio" style="width: 90%;height:50%">'
    out +=  'Your browser does not support the audio element. '
    out +=  '</audio>'

    document.getElementById("audio").innerHTML = out;
}

// -----------------------------------------------------------------------


// ---------------------------------------------

var aud = document.getElementById("myAudio");

aud.addEventListener('ended', endHandler, false);

aud.ontimeupdate = function()
{useTime()};

// ---------------------------------------------


// -----------------------------------------------------------------------

function setTime(tinsec) {

    aud.currentTime = tinsec;

}

// -----------------------------------------------------------------------

function setAudioSrc(filename) {

    aud.src = filename;
    aud.autoplay = true;

    aud.load;

    isplaying = 1;
}

// -----------------------------------------------------------------------


// ******************************************************

// Events

// ******************************************************

// -----------------------------------------------------------------------

function endHandler() {

    var str = '';

    var q = {"juz" : 1, "sect" : 0}

    // if (currentquart < quarterhizbpage.length-1 && quarterhizbpage[currentquart+2].page != 0){
    if (currentquart < quarterhizbpage.length-1 && currentquart+2 < quarterhizbpage.length){
      currentquart++;
      q.juz  = (currentquart / 8 | 0) + 1;
      q.sect = currentquart - (q.juz-1)*8;
      str = audiodir + 'Juz' + q.juz + '_' + q.sect + '.mp3';
    } else {
      currentquart = 0;
      q.juz = 1;
      q.sect = 0;
      currpage = 1;
      turnplay();
    }

    if(isplaying == 1) {
      setAudioSrc(str);
    }

    if (currpage == quarterhizbpage[currentquart].page){
    } else if (q.juz != 0){
        currpage = quarterhizbpage[currentquart].page;
    } else {
        currpage = 1;
    }

    setImageSrc();
    if(isplaying == 1) {
      document.getElementById("page").innerHTML = 'p. '+currpage+" Juz' "+q.juz+', '+hizbStr(q.juz,q.sect);
    }
}

// -----------------------------------------------------------------------

function useTime() {

    var time;

    var dur;
    var timebegin, timeend;
    var q = {"juz" : 1, "sect" : 0}

    if(isplaying == 1) {
      dur = aud.duration;
    }

    if (currpage == quarterhizbpage[currentquart].page && currpage < pagetime.length){
      timebegin = 0;
      timeend = pagetime[currpage].time;
    } else if (currpage == quarterhizbpage[currentquart].page && currpage >= pagetime.length) {
      timebegin = 0;
      timeend = dur;
    } else if (currentquart >= quarterhizbpage.length-1 && currpage == pagetime.length) {
      timebegin = pagetime[currpage-1].time;
      timeend = dur;
    } else if (currentquart >= quarterhizbpage.length-1 ){
      timebegin = pagetime[currpage-1].time;
      timeend = pagetime[currpage].time;
    } else if (currpage == quarterhizbpage[currentquart+1].page){
      timebegin = pagetime[currpage-1].time;
      timeend = dur;
    } else if (currpage+1 == quarterhizbpage[currentquart+1].page && pagetime[currpage].time == 0)  {
      timebegin = pagetime[currpage-1].time;
      timeend = dur;
    } else if (currpage <= quarterhizbpage[currentquart+1].page){
      timebegin = pagetime[currpage-1].time;
      timeend = pagetime[currpage].time;
    }

    if(isplaying == 1) {
      time = aud.currentTime;
    }

    if (time < timebegin){
      currpage--;
      setImageSrc();
    } else if (time > timeend) {
      currpage++;
      setImageSrc();
    }

    q.juz  = (currentquart / 8 | 0) + 1;
    q.sect = currentquart % 8;

    if(isplaying == 1) {
    document.getElementById("page").innerHTML = 'p. '+currpage+" - Juz'"+q.juz+', '+hizbStr(q.juz,q.sect);
    }
}

// -----------------------------------------------------------------------


// ******************************************************

//  Image/Audio Controls

// ******************************************************

// -----------------------------------------------------------------------

function turnpage(direction){

  if (isplaying == 1){
    // Pause the audio
    aud.pause();

    // Reset the playback position
    aud.currentTime = 0;
    // Remove the source
    aud.src = '';

    // Release resources
    aud.load();

    isplaying = 0;
    audset = 0;
  }

  if (pagemode==0){

    if (direction == 1 && currpage < pagetime.length-1){

      if (currpage % 2 !== 1){
          currpage++;
      }else{
        currpage++;
        currpage++;
      }
    } else if (direction !== 1 && currpage > 1) {
      if (currpage % 2 !== 1){
        currpage--;
      }else{
        currpage--;
        currpage--;
      }
    }
    } else {

      if (direction == 1 && currpage < pagetime.length){
          currpage++;
      } else if (direction !== 1 && currpage > 1) {
          currpage--;
      }
  }

  document.getElementById("page").innerHTML = 'p. '+currpage;
  document.getElementById("playstop").innerHTML = " (>) ";

  setImageSrc();

}

// -----------------------------------------------------------------------

function oneturnpage(direction){

  if (isplaying == 1){
    // Pause the audio
    aud.pause();

    // Reset the playback position
    aud.currentTime = 0;
    // Remove the source
    aud.src = '';

    // Release resources
    aud.load();

    isplaying = 0;
    audset = 0;
  }

    if (direction == 1 && currpage < pagetime.length){
      currpage++;
    } else if (direction !== 1 && currpage > 1) {
      currpage--;
    }

  document.getElementById("page").innerHTML = 'p. '+currpage;
  document.getElementById("playstop").innerHTML = " (>) ";

  setImageSrc();

}

// -----------------------------------------------------------------------

function turnplay(){

  if (isplaying == 1){
    // Pause the audio
    aud.pause();

    // Reset the playback position
    aud.currentTime = 0;
    // Remove the source
    aud.src = '';

    // Release resources
    aud.load();

    isplaying = 0;
    audset = 0;

    document.getElementById("page").innerHTML = 'p. '+currpage;

    document.getElementById("playstop").innerHTML = " (>) ";

  } else {


  for (i = 0; i < quarterhizbpage.length-1; i++){
    if (currpage > quarterhizbpage[i].page && currpage <= quarterhizbpage[i+1].page) {
      currentquart = i;
      break;
    }
    if (quarterhizbpage[i+1].page == 0){
      break;
    }
  }

  if (pagetime[currpage-1].time != -1){
    document.getElementById("playstop").innerHTML = " ( [] } ";
    buttonFunction2 (currentquart, currpage);
  }


  }

}

// -----------------------------------------------------------------------
