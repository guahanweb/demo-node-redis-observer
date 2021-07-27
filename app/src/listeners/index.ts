import * as BasicListener from "./basic-listener"

export async function listen(emitter: any) {
  return Promise.all([
    BasicListener.listen(emitter),
  ])
}