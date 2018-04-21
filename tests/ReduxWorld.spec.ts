import {Player, CreatePlayer, PlayerState, CreateStep, InitialWorldState, ReduxWorld, AddPlayer} from '../src/ReduxWorld';

test('patrol', () => {
    let player = CreatePlayer();
    player.state = PlayerState.Patrol;
    player.patrol.target.x = 10;
    player.patrol.target.y = 10;
    ReduxWorld.dispatch(AddPlayer(player));

    let state = InitialWorldState;
    state = ReduxWorld.getState() as any;

    ReduxWorld.dispatch(CreateStep(10));
    expect(state.players[0].point.x).toBe(0);

    player.patrol.speed = 6;

    ReduxWorld.dispatch(CreateStep(1));
    expect(state.players[0].point.x).toBe(6);

    ReduxWorld.dispatch(CreateStep(1));
    expect(state.players[0].point.x).toBe(10);
    expect(state.players[0].point.y).toBe(2);
    
    ReduxWorld.dispatch(CreateStep(2));
    expect(state.players[0].point).toEqual({x: 10, y: 10});
    expect(state.players[0].patrol.target).toEqual({x: 0, y: 0});
    expect(state.players[0].patrol.nextTarget).toEqual({x: 10, y: 10});
    
    ReduxWorld.dispatch(CreateStep(2));
    expect(state.players[0].point).toEqual({x: 0, y: 8});
    
    ReduxWorld.dispatch(CreateStep(2));
    expect(state.players[0].point).toEqual({x: 0, y: 0});
    expect(state.players[0].patrol.target).toEqual({x: 10, y: 10});
    expect(state.players[0].patrol.nextTarget).toEqual({x: 0, y: 0});
});