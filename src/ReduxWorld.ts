import * as redux from 'redux';

export enum PlayerState {
    // 闲置
    Idle,

    // 巡逻
    Patrol,

    // 采集
    Gather,

    // 制作
    Make,
}

export const Point = {
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

export function CreatePlayer() {
    return {...Player};
}

export const InitialWorldState = {
    players: [{...Player}]
};

export function AddPlayer(player = {...Player}) {
    return {type: 'ADD_PLAYER', player};
}

export function CreateStep(time = 0) {
    return {type: 'STEP', time};
}

function players(state = [], action: any) {
    switch (action.type) {
        case 'ADD_PLAYER': {
            return [...state, action.player];
        };
        case 'STEP': {
            return state.map((player) => {
                return PlayerStep(player, action.world, action.time);
            })
        };
    }
    return state;
}

function PlayerStep(player = Player, world = InitialWorldState, time = 10) {
    switch(player.state) {
        case PlayerState.Patrol: {
            let distance = time * player.patrol.speed;
            if (distance >= Math.abs(player.point.x - player.patrol.target.x) + Math.abs(player.point.y - player.patrol.target.y)) {
                player.point = {...player.patrol.target};
                player.patrol.target = {...player.patrol.nextTarget};
                player.patrol.nextTarget = {...player.point};
            }
            else {
                if (Math.abs(player.point.x - player.patrol.target.x) > distance) {
                    player.point.x += (player.patrol.target.x > player.point.x) ? distance : -distance;
                }
                else {
                    distance -= Math.abs(player.point.x - player.patrol.target.x);
                    player.point.x = player.patrol.target.x;
                    
                    player.point.y += (player.patrol.target.y > player.point.y) ? distance : -distance;
                }
            }
            return player;
        };
    }
    return player;
}

export let ReduxWorld = redux.createStore(redux.combineReducers({players}));
