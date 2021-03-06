Vue.createApp({
    data() {
        return {
            //? ---------- ---------- tab Data ---------- ----------
            version: "0.0.3",
            tabAnimation: {
                enter: "",
                leave: ""
            },
            //? Clocker Data
            clock: {
                status: "working", // "working" || "breaking"
                working: 50,
                breaking: 10,
                fulltime: 3000,
                time: 3000,
                timerText: "00:00",
                playing: false, // true || false
                dasharray: 786, //clock progress full
                dashoffset: 0, //clock progress playing
                ringtone: "ringtone1" //setting's ringtone
            },
            //?Date
            date: {
                today: '',
                time: '',
            },
            //? Working Task
            working: {
                id: "000", //項目建立時之時間戳
                title: "無指定項目",
                clock_expect: 8, //預期時間
                clock_spend: 25, //花費時間
                completed: false, //項目完成狀態 完成: true | 未完成: false
                date_create: "2021-01-01", //建立日期
                date_limit: "2022-01-01", // 項目期限
                date_complete: "", //完成日期
            },
            //? filter
            filter: {
                analysis: "task",
                setting: "working"
            },
            //? TODO list Data 
            list: [ // list data
            ],
            //? Editor Data
            editor: {
                status: 'create', //create | edit
                item: {
                    id: "", //項目建立時之時間戳
                    title: "",
                    clock_expect: 0, //預期時間
                    clock_spend: 0, //花費時間
                    completed: false, //項目完成狀態 完成: true | 未完成: false
                    date_create: '', //建立日期
                    date_limit: '',
                    date_complete: '', //完成日期
                }
            },
            //? Analysis Data
            analysis: {
                data: [ // Daily Complete Colck
                ],
                completed: {
                    today: 0,
                    week: 0
                },
                chart: {
                    dateFrom: "2021-01-01",
                    dateTo: "2022-10-30",
                    height: 0.3,
                    week: [{
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                        {
                            date: "",
                            task: 0,
                            clock: 0,
                            data: 0
                        },
                    ],
                }
            },
            weekName: [
                "Sun.", "Mon.", "Tue.", "Wed", "Thu.", "Fri.", "Sat."
            ],
            //? Setting Data
            setting: {
                work: [
                    25, 30, 35, 40,
                    45, 50, 55, 60,
                    75, 90, 120, 150
                ],
                break: [
                    5, 10, 15, 30
                ],
                ringtone: {
                    music_1: "ringtone1",
                    music_2: "ringtone2",
                    music_3: "ringtone3",
                    music_4: "ringtone4",
                    music_5: "ringtone5",
                    music_6: "ringtone6",
                }
            }
        }
    },
    methods: {
        //? ---------- ---------- display ---------- ----------
        callClock() {
            let clockContent = document.querySelector(".display")
            clockContent.classList.add("show")
        },
        closeClock() {
            let clockContent = document.querySelector(".display")
            clockContent.classList.remove("show")
        },
        //? ---------- ---------- tab ---------- ----------
        tabAnimationPosition(position) {
            switch (position) {
                case "right":
                    this.tabAnimation.enter = "slide-left-enter"
                    this.tabAnimation.leave = "slide-right-leave"
                    break;
                case "left":
                    this.tabAnimation.enter = "slide-right-enter"
                    this.tabAnimation.leave = "slide-left-leave"
                    break;
                default:
                    break;
            }
        },
        selectTabs(tab) {
            let tab_item = document.querySelectorAll(".tab-item")
            let tab_active = document.querySelector(".tab-header .active")
            let tab_content = document.querySelectorAll(".tab-content")
            let tab_content_active = document.querySelector(".tab-body .active")
            let selectIndex = "";
            // console.log(tab);
            //? 取得目標的 Index
            tab_item.forEach(item => {
                if (item.dataset.tabTarget == tab) {
                    selectIndex = item.dataset.tabIndex
                }
            })
            //? 判斷動畫方向
            if (tab_active.dataset.tabIndex < selectIndex) {
                //right to left |<<<|
                this.tabAnimationPosition("right");
            } else if (tab_active.dataset.tabIndex > selectIndex) {
                //left to right |>>>|
                this.tabAnimationPosition("left");
            }
            if (tab_active.dataset.tabIndex !== selectIndex) {
                //? 標記目標選項
                // remove old active
                tab_item.forEach((item) => {
                    item.classList.remove("active")
                })
                // add new active
                tab_item.forEach(item => {
                    if (item.dataset.tabTarget == tab) {
                        item.classList.add("active")
                    }
                })
                //? 顯示對應內容
                // render active content
                tab_content.forEach((item) => {
                    // tab 清除所有內容標記
                    item.classList.remove("active")
                    // tab 判斷選項標記內容
                    if (item.dataset.tabContent == tab) {
                        item.classList.add(this.tabAnimation.enter)
                    }
                })
                tab_content_active.classList.add(this.tabAnimation.leave)
                setTimeout(() => {
                    tab_content.forEach((item) => {
                        if (item.dataset.tabContent == tab) {
                            item.classList.add("active")
                            item.classList.remove(this.tabAnimation.enter)
                        }
                    })
                    tab_content_active.classList.remove(this.tabAnimation.leave)
                }, 200);
            }
            this.closeClock()
        },
        //? ---------- ---------- filter ---------- ----------
        filterBtn(e) {
            let filter = e.target.parentNode.querySelector(".filter-bar .filter-btn-active")
            let filterNodes = filter.parentNode.querySelectorAll(".filter-btn")
            filterNodes.forEach(item => {
                filter.classList.remove("filter-btn-active")
            })
            e.target.classList.add("filter-btn-active")
            let slider = filter.parentNode.querySelector(".slider-bar")
            switch (e.target) {
                case filterNodes[0]:
                    slider.style.left = 0
                    break;
                case filterNodes[1]:
                    slider.style.left = `50%`
                    break;
            }
            switch (e.target.dataset.filter) {
                case "analysis":
                    this.filter.analysis = e.target.dataset.filterTarget
                    break;
                case "setting":
                    this.filter.setting = e.target.dataset.filterTarget
                    break;
            }
        },
        filterContent(e) {
            let filter_content = document.querySelectorAll(".filter-content")
            let filter_content_active = document.querySelector(".filter-content-active")
            if (filter_content_active.dataset.filterContent !== e.target.dataset.filterTarget) {
                switch (e.target.dataset.filterTarget) {
                    case "todo":
                        this.tabAnimationPosition("left");
                        break;
                    case "done":
                        this.tabAnimationPosition("right");
                        break;
                }
                //? content
                filter_content.forEach(item => {
                    item.classList.remove("filter-content-active")
                    if (item.dataset.filterContent == e.target.dataset.filterTarget) {
                        item.classList.add(this.tabAnimation.enter)
                    }
                })
                filter_content_active.classList.add(this.tabAnimation.leave)
                setTimeout(() => {
                    filter_content.forEach((item) => {
                        if (item.dataset.filterContent == e.target.dataset.filterTarget) {
                            item.classList.add("filter-content-active")
                            item.classList.remove(this.tabAnimation.enter)
                        }
                    })
                    filter_content_active.classList.remove(this.tabAnimation.leave)
                }, 200);
            }
        },
        //? ---------- ---------- localstorage ---------- ----------
        resetLocalStorage() {
            localStorage.removeItem('clock')
            localStorage.removeItem('working')
            localStorage.removeItem('todolist')
            localStorage.removeItem('completed')
        },
        setLocalClock() {
            localStorage.setItem('clock', JSON.stringify(this.clock))
        },
        getLocalClock() {
            this.clock = JSON.parse(localStorage.getItem('clock'));
            if (this.clock == null) {
                this.resetClock()
            }
        },
        setLocalWorking() {
            localStorage.setItem('working', JSON.stringify(this.working))
        },
        getLocalWorking() {
            this.working = JSON.parse(localStorage.getItem('working'));
            if (this.working == null) {
                this.resetWorking()
            }
        },
        setLocallist() {
            localStorage.setItem('todolist', JSON.stringify(this.list))
        },
        getLocallist() {
            this.list = JSON.parse(localStorage.getItem('todolist'));
            if (this.list == null) {
                this.resetList()
            }
        },
        setLocalCompleted() {
            localStorage.setItem('completed', JSON.stringify(this.analysis.data))
        },
        getLocalCompleted() {
            this.analysis.data = JSON.parse(localStorage.getItem('completed'));
            if (this.analysis.data == null) {
                this.resetCompletedData()
            }
        },
        //? ---------- ---------- reset data ---------- ----------
        resetFilter() {
            this.filter.analysis = "task"
            this.filter.setting = "working"
        },
        resetClock() {
            this.clock = {
                status: "working", // "working" || "breaking"
                working: 50,
                breaking: 10,
                fulltime: 3000,
                time: 3000,
                timerText: "00:00",
                playing: false, // true || false
                dasharray: 786, //clock progress full
                dashoffset: 0, //clock progress playing
                ringtone: "ringtone1" //setting's ringtone
            }
            this.setClockTime()
            this.setLocalClock()
        },
        resetWorking() {
            this.stopClock()
            this.clock.status = "working"
            this.setClockTime()
            this.working = {
                id: "", //項目建立時之時間戳
                title: "無指定項目",
                clock_expect: 8, //預期時間
                clock_spend: 0, //花費時間
                completed: false, //項目完成狀態 完成: true | 未完成: false
                date_create: "", //建立日期
                date_limit: "",
                date_complete: "", //完成日期
            }
            this.setLocalWorking()
        },
        resetList() {
            this.list = [{
                id: 0, //項目建立時之時間戳
                title: "第一個項目",
                clock_expect: 8, //預期時間
                clock_spend: 0, //花費時間
                completed: false, //項目完成狀態 完成: true | 未完成: false
                date_create: '', //建立日期
                date_limit: '',
                date_complete: '', //完成日期
            }];
            this.resetWorking()
            this.setLocallist()
            this.updateDailyTask()
        },
        resetEditor() {
            this.editor.item = {
                id: "", //項目建立時之時間戳
                title: "",
                clock_expect: 0, //預期時間
                clock_spend: 0, //花費時間
                completed: false, //項目完成狀態 完成: true | 未完成: false
                date_create: '', //建立日期
                date_limit: '',
                date_complete: '', //完成日期
            }
        },
        resetAnalysis() {
            this.analysis.chart.week.forEach(item => {
                item.data = item.task
            })
            this.analysis.chart.height = 0.6
        },
        resetCompletedData() {
            this.analysis.data = []
            this.updateDailyTask()
        },
        //? ---------- ---------- Data Format ---------- ----------
        dateFormat(date) {
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            if ((date.getMonth() + 1) < 10) {
                month = `0${date.getMonth()+1}`
            }
            if (date.getDate() < 10) {
                day = `0${date.getDate()}`
            }
            return `${year}-${month}-${day}`
        },
        //? ---------- ---------- Clock Action ---------- ----------
        getstrock() {
            let stroke = document.querySelector('.clock-bar').getTotalLength()
            this.clock.dasharray = stroke
            this.clock.dashoffset = stroke
        },
        setClockTime() {
            switch (this.clock.status) {
                case "working":
                    this.clock.time = this.clock.working * 60
                    this.clock.fulltime = this.clock.working * 60
                    break;
                case "breaking":
                    this.clock.time = this.clock.breaking * 60
                    this.clock.fulltime = this.clock.breaking * 60
                    break;
            }
        },
        renderClock() {
            if (this.clock.time % 60 < 10) {
                this.clock.timerText = `${parseInt(this.clock.time / 60)}:0${this.clock.time % 60}`
            } else {
                this.clock.timerText = `${parseInt(this.clock.time / 60)}:${this.clock.time % 60}`
            }
            this.clock.dashoffset = this.clock.dasharray * ((this.clock.time / this.clock.fulltime))
        },
        switchClock() {
            switch (this.clock.status) {
                case "working":
                    this.clock.status = "breaking"
                    break;
                case "breaking":
                    this.clock.status = "working"
                    break;
            }
        },
        playingClock() {
            if (this.clock.playing) {
                this.clock.time--;
                this.setLocalWorking()
            }
            if (this.clock.time <= 0) {
                this.switchClock()
                this.setClockTime()
                this.clock.playing = false
            }
            this.renderClock()
        },
        stopClock() {
            this.clock.playing = false
            this.setClockTime()
            this.renderClock()
        },
        playClock() {
            this.clock.playing = true
            this.renderClock()
        },
        pauseClock() {
            this.clock.playing = false
            this.renderClock()
        },
        skipClock() {
            this.clock.playing = false
            if (this.clock.status == "working") {
                this.updateTodayClock()
                this.working.clock_spend++
            }
            this.setLocalWorking()
            this.switchClock()
            this.setClockTime()
            this.renderClock()
            this.setLocalCompleted()
        },
        //? setting part
        setWorkTime(item) {
            this.stopClock()
            this.clock.working = item
            this.setClockTime()
        },
        setBreakTime(item) {
            this.stopClock()
            this.clock.breaking = item
            this.setClockTime()
        },
        setBreakRingtone(item) {
            this.clock.ringtone = item
        },
        //? ---------- ---------- Editor Action ---------- ----------
        getTodayDate() {
            this.date.today = this.dateFormat(new Date)
        },
        addItem() {
            this.editor.item.id = new Date().getTime()
            this.editor.item.date_create = this.date.today
            this.list.push(this.editor.item)
            this.resetEditor()
            this.setLocallist()
        },
        editItem(item) {
            this.editor.status = 'edit'
            this.editor.item = {
                ...item
            }
        },
        updateItem() {
            const Index = this.list.findIndex(item => item.id === this.editor.item.id)
            // console.log(Index);
            if (this.list[Index] !== undefined) {
                this.list[Index] = this.editor.item
            } else {
                console.log('List Index undefined');
            }
            this.resetWorking()
            this.resetEditor()
            this.editor.status = 'create'
            this.setLocallist()
        },
        editWork() {
            const Index = this.list.findIndex(item => item.id === this.working.id)
            console.log(Index);
            if (this.list[Index] !== undefined) {
                this.editor.status = 'edit'
            } else {
                this.editor.status = 'create'
            }
            this.editor.item = {
                ...this.working
            }
        },
        playItem(item) {
            this.working = item
            this.setLocalWorking()
        },
        completeItem(item) {
            item.completed = true
            if (this.working.id == item.id) {
                this.resetWorking()
            }
            item.date_complete = this.date.today
            this.setLocallist()
        },
        replyItem(item) {
            item.completed = false
            if (this.working.id == item.id) {
                this.resetWorking()
            }
            item.date_complete = ""
            this.setLocallist()
        },
        removeItem() {
            const Index = this.list.findIndex(item => item.id === this.editor.item.id)
            if (this.list[Index] !== undefined) {
                console.log('REMOVE Item:');
                console.log(this.list[Index]);
                this.list.splice(Index, 1)
            }
            this.resetEditor()
            this.setLocallist()
        },
        workingComplete() {
            const Index = this.list.findIndex(item => item.id === this.working.id)
            if (this.list[Index] !== undefined) {
                this.list[Index].completed = true
            } else {
                console.log('List Index undefined');
            }
            this.resetWorking()
            this.setLocallist()
        },
        //? ---------- ---------- Analysis Action ---------- ----------
        //? Render This Week Data
        getThisWeek() {
            const dayTime = 60 * 60 * 24 * 1000
            let time = new Date(this.date.today).getTime()
            let day = new Date(this.date.today).getDay()
            this.analysis.chart.dateFrom = this.dateFormat(new Date(time - dayTime * day))
            this.updateWeekRange()
        },
        //? Change DateFrom
        updateDate(range) {
            const dayTime = 60 * 60 * 24 * 1000
            let time = new Date(this.analysis.chart.dateFrom).getTime()
            let newday = new Date(time + dayTime * range)
            this.analysis.chart.dateFrom = this.dateFormat(newday)
            this.updateWeekRange()
        },
        //? Change Week Range
        updateWeekRange() {
            const dayTime = 60 * 60 * 24 * 1000
            let time = new Date(this.analysis.chart.dateFrom).getTime()
            for (let i = 0; i < 7; i++) {
                let newday = new Date(time + dayTime * i)
                this.dateFormat(newday)
                this.analysis.chart.week[i].date = this.dateFormat(newday)
            }
            this.analysis.chart.dateTo = this.dateFormat(new Date(time + dayTime * 6))
            this.getChartWeekData()
        },
        getChartWeekData() {
            this.analysis.chart.week.forEach(day => {
                let Index = this.analysis.data.findIndex(item => item.date === day.date)
                if (Index !== -1) {
                    day.task = this.analysis.data[Index].task
                    day.clock = this.analysis.data[Index].clock
                } else {
                    day.task = 0
                    day.clock = 0
                }
            })
            this.getWeekCompleted()
            this.renderAnalysis()
        },

        getWeekCompleted() {
            switch (this.filter.analysis) {
                case "task":
                    this.analysis.completed.week = this.analysis.chart.week.map(el => el.task).reduce((a, b) => a + b)
                    break
                case "clock":
                    this.analysis.completed.week = this.analysis.chart.week.map(el => el.clock).reduce((a, b) => a + b)
                    break
            }
        },
        renderAnalysis() {
            let Index = this.analysis.data.findIndex(item => item.date === this.date.today)
            if (Index !== -1) {
                switch (this.filter.analysis) {
                    case "task":
                        this.analysis.completed.today = this.analysis.data[Index].task
                        break
                    case "clock":
                        this.analysis.completed.today = this.analysis.data[Index].clock
                        break
                }
            }
            switch (this.filter.analysis) {
                case "task":
                    this.analysis.chart.week.forEach(item => {
                        item.data = item.task
                    })
                    this.analysis.chart.height = 0.6
                    break;
                case "clock":
                    this.analysis.chart.week.forEach(item => {
                        item.data = item.clock
                    })
                    this.analysis.chart.height = 0.3
                    break;
            }
            this.getWeekCompleted()
        },
        plusData(item) {
            item.data += 1
        },
        updateTodayClock() {
            let Index = this.analysis.data.findIndex(data => data.date === this.date.today)
            if (Index == -1) {
                //? this.analysis.data haven't today's Data
                this.analysis.data.push({
                    date: this.date.today,
                    task: 0,
                    clock: 1
                })
            } else {
                //? this.analysis.data have today's Data
                this.analysis.data[Index].clock += 1
            }
            this.getChartWeekData()
        },
        updateDailyTask() {
            //? Reset analysis.data.task
            this.analysis.data.forEach(item => {
                item.task = 0
            })
            this.list.filter(el => el.completed == true).forEach(item => {
                let Index = this.analysis.data.findIndex(el => el.date === item.date_complete)
                if (Index == -1) {
                    this.analysis.data.push({
                        date: this.date.today,
                        task: 1,
                        clock: 0
                    })
                } else {
                    this.analysis.data[Index].task += 1
                }
            })
            this.getChartWeekData()
            this.setLocalCompleted()
        }
    },
    mounted() {
        //? get real date data
        this.getTodayDate()
        this.getThisWeek()
        //? get localStorage data
        this.getLocalClock()
        this.getLocalWorking()
        this.getstrock()
        this.getLocallist()
        this.getLocalCompleted()
        //? get clock player setting
        this.setClockTime()
        this.renderClock()
        this.timer = setInterval(this.playingClock, 1000);
        //? Reset Analysis Data
        this.resetFilter()
        this.resetAnalysis()
        this.renderAnalysis()
        this.updateDailyTask()
    },
    computed() {}
}).mount('#app');