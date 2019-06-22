import React, { Component } from 'react';
import TeamSelector from './TeamSelector'
import './InsertMatch.css';
import ScoreInput from './ScoreInput';

export class InsertMatch extends Component {

    constructor (props) {
        super(props);
        this.state = { players: [], teams: [] };
        this.player1Change = this.player1Change.bind(this);
        this.player2Change = this.player2Change.bind(this);
        this.teamChange = this.teamChange.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.isPlayerInTeam = this.isPlayerInTeam.bind(this);
        this.getSecondPlayer = this.getSecondPlayer.bind(this);
        this.getSecondPlayerId = this.getSecondPlayerId.bind(this);
        this.getPossibleTeamMates = this.getPossibleTeamMates.bind(this);
        this.getPossibleTeams = this.getPossibleTeams.bind(this);
        this.getTeam = this.getTeam.bind(this);
        this.isTheTeam = this.isTheTeam.bind(this);
        this.scoreChange = this.scoreChange.bind(this);
        this.noteChange = this.noteChange.bind(this);
        

        fetch('api/Player/')
            .then(response => response.json())
            .then(data => {
                this.setState({ players: data });
            });

            fetch('api/Team/')
                .then(response => response.json())
                .then(data => {
                    this.setState({ teams: data });
                });
    }

    getPlayer = (id) => 
        this.state.players ? this.state.players.find(p => p.id === id) : null;

    isPlayerInTeam(team, player){
        return player && team.playerIds.some(x => x === player.id);
    }

    getPossibleTeamMates(player) {
        const players = this.state.players;
        const teams = this.state.teams;
        if (!player)
            return players ? players : [];

        let mates = [];

        this.getPossibleTeams(player, teams)
            .forEach(team => mates.push(this.getSecondPlayer(team, player, players)));

        return mates
    }

    getSecondPlayerId = (team, player) => team.player1Id === player.id
        ? team.player2Id
        : team.player1Id;

    getSecondPlayer = (team, player, players) => players
        ? players.find(p => p.id === this.getSecondPlayerId(team, player))
        : null;

    

    getPossibleTeams(player, teams) {
        if (!player)
            return teams ? teams : [];

        return teams
            .filter(x => this.isPlayerInTeam(x, player));
    }

    getTeam(player1, player2, teams) {
        if (!player1 || !player2)
            return teams;

        return teams
            .find(x => this.isPlayerInTeam(x, player1) && this.isPlayerInTeam(x, player2));
    }

    isTheTeam(team, player1, player2) {
        return this.isPlayerInTeam(team, player1) && this.isPlayerInTeam(team, player2) && player1.id !== player2.id;
    }

    player1Change(player, name){
        const possibleTeams = player 
            ? this.state.teams.filter(t => this.isPlayerInTeam(t, player))
            : this.state.teams;

        const team = possibleTeams && possibleTeams.length === 1 
            ? possibleTeams[0]
            : null;

        
        const mates = this.getPossibleTeamMates(player);

        const player2 = mates && mates.length === 1
            ? mates[0]
            : null;

        this.setState({ 
            [name + 'Player1']: player, 
            [name + 'TeamMates']: mates,
            [name + 'Player2']: player2, 
            [name + 'Team']: team,
            [name + 'PossibleTeams']: possibleTeams,
        });
    }

    player2Change(player, name){
        if(this.state[name + 'Player1']){
            const team = this.getTeam(this.state[name + 'Player1'], player, this.state.teams)
            this.setState({ 
                [name + 'Player2']: player, 
                [name + 'Team']: team,
                [name + 'PossibleTeams']: this.state.teams,
            });
        } else
            this.setState({ 
                [name + 'Player2']: player,
                [name + 'PossibleTeams']: this.state.teams,
            });
    }

    teamChange(team, name){
        const player1 = team ? this.getPlayer(team.player1Id) : null;
        const player2 = team ? this.getPlayer(team.player2Id) : null;
        this.setState({
            [name + 'Team']: team,
            [name + 'Player1']: player1, 
            [name + 'TeamMates']: this.getPossibleTeamMates(player1),
            [name + 'Player2']: player2,
            [name + 'PossibleTeams']: this.state.teams,
        });
    }

    scoreChange(score, name){
        if(score !== 1 && score < 10){
            var otherScore = name === 'red' ? 'yellow' : 'red';
            this.setState({ [name + 'Score']: score, [otherScore + 'Score']: 10 });
            return;
        }
        this.setState({ [name + 'Score']: score });
    }

    noteChange(event){
        this.setState({ note: event.target.value });
    }

    render () {
        const players = this.state.players;

        const yellowPlayer1 = this.state.yellowPlayer1;  
        const yellowPlayer2 = this.state.yellowPlayer2;
        const yellowTeam = this.state.yellowTeam;
        const yellowTeamMates = this.state.yellowTeamMates;
        const yellowPossibleTeams = this.state.yellowPossibleTeams ? this.state.yellowPossibleTeams : this.state.teams;
        const yellowScore = this.state.yellowScore || this.state.yellowScore === 0 ? this.state.yellowScore : '';

        const redPlayer1 = this.state.redPlayer1;  
        const redPlayer2 = this.state.redPlayer2;
        const redTeam = this.state.redTeam;
        const redTeamMates = this.state.redTeamMates;
        const redPossibleTeams = this.state.redPossibleTeams ? this.state.redPossibleTeams : this.state.teams;
        const redScore = this.state.redScore || this.state.redScore === 0 ? this.state.redScore : '';

        const note = this.state.note;

        const valid = 
            yellowTeam && 
            redTeam && 
            (
                (redScore === 10 && (yellowScore || yellowScore === 0)) || 
                (yellowScore === 10 && (redScore || redScore === 0))
            ) &&
            redScore !== yellowScore &&
            note;

        const isDisabled = !valid;

        return (
            <div className="insert-match">
                <h1>Insert Match</h1>
                <div className="row">
                    <div className="col-md-6">
                        <TeamSelector 
                            teamName="Yellow team" 
                            name="yellow" 
                            possibleTeams={yellowPossibleTeams} 
                            team={yellowTeam} 
                            players={players} 
                            player1={yellowPlayer1} 
                            teamMates={yellowTeamMates}
                            player2={yellowPlayer2}
                            onPlayer1Change={this.player1Change}
                            onPlayer2Change={this.player2Change}
                            onTeamChange={this.teamChange} />

                        <ScoreInput name='yellow' change={this.scoreChange} value={yellowScore} /> 
                    </div>

                    <div className="col-md-6">
                        <TeamSelector 
                            teamName="Red team" 
                            name="red" 
                            possibleTeams={redPossibleTeams} 
                            team={redTeam} 
                            players={players} 
                            player1={redPlayer1} 
                            teamMates={redTeamMates}
                            player2={redPlayer2}
                            onPlayer1Change={this.player1Change}
                            onPlayer2Change={this.player2Change}
                            onTeamChange={this.teamChange} />
                        <ScoreInput name='red' change={this.scoreChange} value={redScore}/>
                    </div>
                </div>
                <div className="row">
                                
                    <div className="col-12 note">
                        <label htmlFor="note">Note</label>
                        <div>
                            <textarea name="note" tabIndex="3" onChange={this.noteChange}/>
                        </div>
                    </div>
                </div>
                <button tabIndex="4" disabled={isDisabled}>Save</button>
            </div>
        );
    }
}