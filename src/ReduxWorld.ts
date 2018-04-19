import * as redux from 'redux';

enum PlayerState {
    // 闲置
    Idle,

    // 巡逻
    Patrol,

    // 采集
    Gather,

    // 制作
    Make,
}

const Point = {
    x: 0,
    y: 0,
}

export const Player = {
    point: {...Point},
    health: 100,
    state: PlayerState.Idle,

    patrol: {
        target: {...Point},
        nextTarget: {...Point},
        speed: 0,
    }
}

export const World = {
    players: [{...Player}]
}

const InitialState = {
    players: [{...Player}]
};

function counter(state = InitialState, action: any) {
    switch (action.type) {
        // case 'STEP':
        //     return state + 1
        // case 'DECREMENT':
        //     return state - 1
        default:
            return state
    }
}

function PlayerStep(state = InitialState, player = Player, step: 10) {

}

redux.createStore(counter);