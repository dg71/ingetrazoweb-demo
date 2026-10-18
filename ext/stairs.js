import { Vector3 as p, Matrix4 as m } from "three";
import { addTranslations as c, t as a, units as f, Tool as S, showSnap as w, Group as x, Mesh as v, ops as d } from "ingetrazo-web";
c("de", {
  Stairs: "Treppe",
  "Insert stairs": "Treppe einfügen",
  Steps: "Stufen",
  Rise: "Steigung",
  Tread: "Auftritt",
  Width: "Breite",
  "Click the start point of the stairs ({n} steps).": "Startpunkt der Treppe klicken ({n} Stufen).",
  "Stairs with {n} steps": "Treppe mit {n} Stufen"
});
c("es", {
  Stairs: "Escalera",
  "Insert stairs": "Insertar escalera",
  Steps: "Peldaños",
  Rise: "Contrahuella",
  Tread: "Huella",
  Width: "Ancho",
  "Click the start point of the stairs ({n} steps).": "Haga clic en el punto inicial de la escalera ({n} peldaños).",
  "Stairs with {n} steps": "Escalera de {n} peldaños"
});
const i = { steps: 8, rise: 0.18, tread: 0.28, width: 1.2 };
function g(t) {
  const e = [new p(0, 0, 0)];
  for (let n = 0; n < t.steps; n++)
    e.push(new p(n * t.tread, 0, (n + 1) * t.rise)), e.push(new p((n + 1) * t.tread, 0, (n + 1) * t.rise));
  e.push(new p(t.steps * t.tread, 0, 0));
  const s = new v(), { faces: r } = d.drawSegments(s, d.loopSegments(e));
  return d.pushPull(s, r[0], t.width), s;
}
function u(t, e) {
  const s = t.history.begin(a("Insert stairs")).structure(), r = new x(g(i), a("Stairs with {n} steps", { n: i.steps }));
  r.extra.ext = { stairs: { ...i } }, r.matrix.copy(t.vp.contextWorld().invert().multiply(new m().setPosition(e))), r.parent = t.context, t.contextGroups.push(r), t.model.touch(), s.commit();
}
class T extends S {
  id = "stairs";
  name = a("Stairs");
  shortcut = "y";
  vcbLabel = a("Steps");
  hint() {
    return a("Click the start point of the stairs ({n} steps).", { n: i.steps });
  }
  move(e) {
    super.move(e), w(this.app, this.app.inference.find(e.x, e.y), e);
  }
  down(e) {
    u(this.app, this.app.inference.find(e.x, e.y).point);
  }
  value(e) {
    const s = Math.round(Number(e));
    return s >= 1 && s <= 100 ? (i.steps = s, this.app.setHint(this.hint()), !0) : !1;
  }
}
const k = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M3 20h18V4h-4v4h-4v4H9v4H3z"/></svg>', M = {
  id: "stairs",
  name: "Stair generator",
  setup(t) {
    const e = t.app;
    t.addTool(new T(e), k), t.addMenu(a("Stairs"), [{ label: a("Insert stairs"), run: () => u(e, new p()) }]), t.addPanel({
      title: a("Stairs"),
      render(s) {
        s.replaceChildren();
        for (const [n, h] of [["steps", "Steps"], ["rise", "Rise"], ["tread", "Tread"], ["width", "Width"]]) {
          const l = document.createElement("label");
          l.className = "row";
          const o = document.createElement("input");
          o.type = "number", o.step = n === "steps" ? "1" : "0.01", o.value = String(i[n]), o.onchange = () => i[n] = Number(o.value) || i[n], l.append(a(h) + " ", o), s.append(l);
        }
        const r = document.createElement("p");
        r.textContent = `${a("Stairs")}: ${f.formatLength(i.steps * i.rise)}`, s.append(r);
      }
    }), t.addSnapPoints(
      () => [...e.model.allGroups()].filter((s) => s.extra.ext && s.extra.ext.stairs).map((s) => {
        const r = s.extra.ext.stairs;
        return { point: new p(r.steps * r.tread, 0, r.steps * r.rise).applyMatrix4(s.worldMatrix()), label: a("Stairs") };
      })
    );
  }
};
export {
  M as default
};
