console.log(`by christ-offert`);

class Index {
  constructor(myParams) {
    this.links = myParams;

    if (screen.width < 640) {
      this.increment = 9;
    } else if (screen.width < 1024) {
      this.increment = 18;
    } else {
      this.increment = 36;
    }

    this.searching = false;
    this.datas = myParams;

    this.bodies = document.body;

    this.founds = 0;

    this.theHtml = document.getElementById("the-html");
    this.theme = `on`;

    this.createNavbar();
    this.createBody();

    this.createFooter();

    this.showhLibrary(this.datas[0]);
    this.sectionSearch.classList.remove("hidden");
    this.foots.classList.remove("fixed", "bottom-0", "left-0");
  }

  createPages(id, classes, content) {
    const div = document.createElement("div");
    div.id = id;
    div.className = classes;
    div.innerHTML = content;
    this.section.appendChild(div);
  }

  showhLibrary(params) {
    this.displayLibrary(params);

    this.counts = this.allIcons();

    this.pageStart = 0;
    this.pageEnd = this.increment;
    this.moves = parseInt(this.counts / this.pageEnd);

    this.page = 1;
    this.pageCounts = 0;
    this.counts % this.pageEnd > 0
      ? (this.pageCounts = this.moves + 1)
      : (this.pageCounts = this.moves);

    this.labelPage.innerHTML = ` ${this.page} / ${this.pageCounts} `;

    this.paginate(this.pageStart, this.pageEnd, "myicon-item");
  }

  previousPage(param) {
    if (this.pageStart > 0) {
      this.pageStart = this.pageStart - this.increment;
      this.pageEnd = this.pageEnd - this.increment;
      this.paginate(this.pageStart, this.pageEnd, param);
      this.moves++;
      this.page--;
      this.labelPage.innerHTML = ` ${this.page} / ${this.pageCounts} `;
    }
  }

  nextPage(param) {
    if (this.moves > 0) {
      this.pageStart = this.pageStart + this.increment;
      this.pageEnd = this.pageEnd + this.increment;
      this.paginate(this.pageStart, this.pageEnd, param);
      this.moves--;
      this.page++;
      this.labelPage.innerHTML = ` ${this.page} / ${this.pageCounts} `;
    }
  }

  displayLibrary(params) {
    const library = params;
    const libraryName = library.name;
    let libraryIco = ``;
    library.ico ? (libraryIco = library.ico) : (libraryIco = "");
    const libraryContent = library.content;

    this.createMain(libraryName, this.counts, libraryIco);

    for (let index = 0; index < libraryContent.length; index++) {
      const libraryCategory = libraryContent[index];
      const libraryCategoryName = libraryCategory.categorie;
      const libraryCategoryIcons = libraryCategory.icons;
      this.createAllIcons(libraryCategoryName, libraryCategoryIcons);
    }
  }

  createAllIcons(name, icons) {
    const titre = name;
    const collections = icons;
    for (let n = 0; n < collections.length; n++) {
      const icon = collections[n].item;
      this.createIcons(titre, icon);
    }
  }

  toggleMode() {
    if (this.theHtml.classList.contains("dark")) {
      this.theHtml.classList.remove("dark");
      this.theme = `off`;
    } else {
      this.theHtml.classList.add("dark");
      this.theme = `on`;
    }
  }

  createNavbar() {
    this.navbar = document.createElement("nav");
    this.navbar.id = `navbar`;
    // old :  max-[640px]:px-5 px-12 flex justify-between items-center relative
    this.navbar.className = `w-full min-h-[64px] h-[15vh]`;
    this.bodies.appendChild(this.navbar);

    const navDiv = document.createElement("div");
    navDiv.className = `container h-full mx-auto flex justify-between items-center relative`;
    this.navbar.appendChild(navDiv);

    const navBtn = document.createElement("button");
    navBtn.className = `bg-slate-300 hover:bg-slate-500 dark:bg-slate-800 dark:hover:bg-slate-600 rounded w-10 h-10 `;
    navBtn.innerHTML = `<i class="fa fa-bars"></i>`;
    navDiv.appendChild(navBtn);

    const h1 = document.createElement("h1");
    h1.className = `dark:text-slate-200 text-3xl font-semibold select-none`;
    h1.innerHTML = `my <span class="text-blue-500">icons</span>`;
    navDiv.appendChild(h1);

    const ul = document.createElement("ul");
    ul.className = `w-fit h-fit bg-slate-200/70 dark:bg-slate-950/90 backdrop-blur border border-blue-400 dark:border-slate-800 py-5 px-2 flex flex-col justify-end items-center gap-2 select-none absolute top-full left-10 z-10 rounded hidden`;
    navDiv.appendChild(ul);

    for (let index = 0; index < this.links.length; index++) {
      const link = this.links[index];
      const li = document.createElement("li");
      li.className = `p-2 underline underline-offset-8 hover:text-blue-500 cursor-pointer li-item-list-ico`;
      li.innerHTML = `${link.ico ? link.ico : ""} ${link.name}`;
      li.onclick = () => {
        this.section.innerHTML = ``;
        this.currentLibs = this.datas[link.data];
        if (this.currentLibs) {
          this.showhLibrary(this.currentLibs);
          this.sectionSearch.classList.remove("hidden");
          this.foots.classList.remove("fixed", "bottom-0", "left-0");
        } else {
          this.sectionSearch.classList.add("hidden");
          this.foots.classList.add("fixed", "bottom-0", "left-0");
        }
      };
      ul.appendChild(li);
    }

    let themeBtn = document.createElement("button");
    themeBtn.className = `w-fit h-fit text-xl flex justify-center item-center gap-2`;
    themeBtn.innerHTML = `<i class="far fa-sun"></i> <i class="fa fa-toggle-${this.theme}"></i> <i class="far fa-moon"></i>`;
    navDiv.appendChild(themeBtn);

    navBtn.onclick = () => {
      ul.classList.toggle("hidden");
    };

    try {
      const liItemListIco = document.querySelectorAll(".li-item-list-ico");
      liItemListIco.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          ul.classList.add("hidden");
        });
      });
    } catch (error) {}

    try {
      ul.addEventListener("mouseleave", () => {
        ul.classList.toggle("hidden");
      });
    } catch (error) {}

    themeBtn.onclick = () => {
      if (!themeBtn.classList.contains("actives")) {
        themeBtn.classList.add("animate-ping", "actives");
        setTimeout(() => {
          themeBtn.classList.remove("animate-ping", "actives");
        }, 600);
        this.toggleMode();
        themeBtn.innerHTML = `<i class="far fa-sun"></i> <i class="fa fa-toggle-${this.theme}"></i> <i class="far fa-moon"></i>`;
      }
    };
  }

  createSearchbar() {
    this.sectionSearch = document.createElement("section");
    this.sectionSearch.id = `searchbar`;
    this.sectionSearch.className = `w-full my-5 mx-auto hidden flex flex-wrap justify-between items-center`;
    this.section.appendChild(this.sectionSearch);

    const div = document.createElement("div");
    div.className = `bg-slate-300 dark:bg-slate-200 dark:text-black min-w-[200px] w-fit my-2 p-1 text-base rounded flex relative`;
    this.sectionSearch.appendChild(div);

    const i = document.createElement("i");
    i.className = `min-w-[40px] w-10 h-10 bg-transparent relative before:absolute before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] fa fa-search`;
    div.appendChild(i);

    const input = document.createElement("input");
    input.className = `bg-transparent w-[300px] outline-none`;
    input.placeholder = `chercher ici`;
    div.appendChild(input);

    const closesearchBtn = document.createElement("button");
    closesearchBtn.className = `min-w-[40px] w-10 h-10 text-red-500 hover:bg-red-500 hover:text-slate-950 rounded hidden`;
    closesearchBtn.innerHTML = `<i class='fa fa-x'></i>`;
    div.appendChild(closesearchBtn);

    const nlabel = document.createElement("h3");
    nlabel.className = `w-fit h-full px-2 text-black dark:text-slate-50 uppercase font-bold flex items-center select-none hidden`;
    nlabel.innerText = `resultat : ${this.founds}`;
    this.sectionSearch.appendChild(nlabel);

    input.oninput = () => {
      if (input.value === "") {
        this.founds = 0;
        this.paginate(this.pageStart, this.pageEnd, "myicon-item");
        document.getElementById("action-page").classList.remove("hidden");
        nlabel.classList.add("hidden");
        closesearchBtn.classList.add("hidden");
        this.searching = false;
      } else {
        this.founds = this.searchFilter(input.value);
        nlabel.innerText = `resultat : ${this.founds}`;
        nlabel.classList.remove("hidden");
        closesearchBtn.classList.remove("hidden");
        this.searching = true;
        this.founds == 0
          ? document.getElementById("action-page").classList.add("hidden")
          : document.getElementById("action-page").classList.remove("hidden");
      }
    };

    closesearchBtn.onclick = () => {
      input.value = "";
      this.clearSearch();
      nlabel.classList.add("hidden");
      closesearchBtn.classList.add("hidden");
    };
  }

  createLi(categ, icn) {
    const li = document.createElement("li");
    li.setAttribute("data-icon", `${categ} ${icn}`);
    li.className = `myicon-item w-48 h-48 text-xl rounded border border-slate-400 dark:border-slate-700 bg-slate-300 dark:bg-slate-800 flex flex-col justify-center items-center gap-1 relative select-none z-0`;
    this.listIcons.appendChild(li);

    const label = document.createElement("label");
    label.className = `top-0 left-0 w-10 h-10 flex justify-center items-center font-semibold absolute`;
    label.innerText = categ;
    li.appendChild(label);

    const i = document.createElement("i");
    i.className = `${categ} ${icn} text-green-600 dark:text-green-500 text-4xl`;
    li.appendChild(i);

    const label1 = document.createElement("label");
    label1.className = `w-[80%] text-center`;
    label1.innerText = icn;
    li.appendChild(label1);

    const input = document.createElement("input");
    input.className = `w-0 h-0 overflow-hidden outline-0 border-none opacity-0 z-[-999]`;
    input.value = `${categ} ${icn}`;
    li.appendChild(input);

    const iconBtn = document.createElement("button");
    iconBtn.type = "button";
    iconBtn.className = `bg-blue-500 hover:bg-blue-700 text-base uppercase font-semibold text-slate-950 rounded mt-1 px-2 h-10`;
    iconBtn.innerHTML = `copy <i class="far fa-copy"></i>`;
    li.appendChild(iconBtn);

    iconBtn.onclick = () => {
      if (!iconBtn.classList.contains("copied")) {
        iconBtn.classList.add("bg-green-500", "hover:bg-green-500", "copied");
        iconBtn.innerHTML = `done <i class="fa fa-check"></i>`;
        input.select();
        document.execCommand("copy");
        setTimeout(() => {
          iconBtn.innerHTML = `copy <i class="far fa-copy"></i>`;
          iconBtn.classList.remove(
            "bg-green-500",
            "hover:bg-green-500",
            "copied"
          );
        }, 800);
      }
    };
  }

  createBody() {
    this.section = document.createElement("section");
    this.section.id = `main`;
    this.section.className = `max-[640px]:w-[80%] sm:container min-h-[75vh] pb-5 mx-auto z-0`;
    this.bodies.appendChild(this.section);
  }

  createMain(name, count, icon) {
    const mainTitle = document.createElement("h2");
    mainTitle.className = `text-xl mb-4 underline underline-offset-8 select-none`;
    mainTitle.innerHTML = `${icon} ${name} (<span id="counts">${count}</span> icons)`;
    this.section.appendChild(mainTitle);

    this.createSearchbar();

    this.listIcons = document.createElement("ul");
    this.listIcons.className = `max-[640px]:justify-center w-full min-h-[10vh] grid grid-cols-[repeat(auto-fill,minmax(192px,192px))] gap-x-2 gap-y-4 place-items-center justify-between`;
    this.section.appendChild(this.listIcons);

    const actionInPage = document.createElement("div");
    actionInPage.id = "action-page";
    actionInPage.className = `w-full h-14 my-4 text-xl flex justify-center items-center gap-2`;
    this.section.appendChild(actionInPage);

    const previousBtn = document.createElement("button");
    previousBtn.type = "button";
    previousBtn.className = `w-10 h-10 rounded`;
    previousBtn.innerHTML = `<i class="fa fa-chevron-left"></i> `;
    actionInPage.appendChild(previousBtn);

    this.labelPage = document.createElement("button");
    this.labelPage.type = "button";
    this.labelPage.className = `w-40 h-10 rounded`;
    this.labelPage.innerHTML = ` ${this.moves} / ${this.moves} `;
    actionInPage.appendChild(this.labelPage);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = `w-10 h-10 rounded`;
    nextBtn.innerHTML = ` <i class="fa fa-chevron-right"></i>`;
    actionInPage.appendChild(nextBtn);

    previousBtn.onclick = () => {
      if (this.searching) {
        this.previousPage("search-item");
      } else {
        this.previousPage("myicon-item");
      }
    };

    nextBtn.onclick = () => {
      if (this.searching) {
        this.nextPage("search-item");
      } else {
        this.nextPage("myicon-item");
      }
    };
  }

  createFooter() {
    this.foots = document.createElement("footer");
    // old : px-[8vh] flex justify-between items-center
    this.foots.className = `bg-slate-300 dark:bg-black dark:text-slate-50 w-full h-[10vh] text-sm font-semibold select-none fixed bottom-0 left-0`;
    this.bodies.appendChild(this.foots);

    const footDiv = document.createElement("div");
    footDiv.className = `container h-full mx-auto flex justify-between items-center`;
    footDiv.innerHTML = `<h2 class=""><i class="far fa-copyright"></i> copyright 2023</h2><h2 class="">by christ-offert</h2>`;
    this.foots.appendChild(footDiv);
  }

  createIcons(type, icon) {
    this.createLi(type, icon);
  }

  allIcons() {
    try {
      const myiconItem = document.getElementsByClassName("myicon-item");
      document.getElementById("counts").innerHTML = myiconItem.length;
      return myiconItem.length;
    } catch (error) {
      throw error;
    }
  }

  hideAll() {
    try {
      const myiconItem = document.getElementsByClassName("myicon-item");
      for (let index = 0; index < myiconItem.length; index++) {
        myiconItem[index].classList.add("hidden");
      }
    } catch (error) {
      throw error;
    }
  }

  paginate(pf, pe, param) {
    const myiconItem = document.getElementsByClassName(param);
    this.hideAll();
    for (let index = pf; index < pe; index++) {
      try {
        myiconItem[index].classList.remove("hidden");
      } catch (error) {}
    }
  }

  searchFilter(param) {
    try {
      const myiconItems = document.querySelectorAll(".myicon-item");
      this.hideAll();

      myiconItems.forEach((myiconItem) => {
        const txt = myiconItem.getAttribute("data-icon");
        myiconItem.classList.remove("search-item");
        if (txt.indexOf(param) != -1) {
          myiconItem.classList.remove("hidden");
          myiconItem.classList.add("search-item");
        }
      });

      let numberFounds = document.querySelectorAll(".search-item").length;

      this.paginateSearch(numberFounds);

      return numberFounds;
    } catch (error) {
      throw error;
    }
  }

  paginateSearch(counts) {
    this.pageStart = 0;
    this.pageEnd = this.increment;
    this.moves = parseInt(counts / this.pageEnd);

    this.page = 1;
    this.pageCounts = 0;

    counts % this.pageEnd > 0
      ? (this.pageCounts = this.moves + 1)
      : (this.pageCounts = this.moves);

    // this.moves == 1 ? this.moves = 0 : null;
    this.labelPage.innerHTML = ` ${this.page} / ${this.pageCounts}`;

    this.paginate(this.pageStart, this.pageEnd, "search-item");
  }

  clearSearch() {
    try {
      this.searchFilter("");
      this.paginate(this.pageStart, this.pageEnd, "myicon-item");
      document.getElementById("action-page").classList.remove("hidden");
    } catch (error) {
      throw error;
    }
  }
}
