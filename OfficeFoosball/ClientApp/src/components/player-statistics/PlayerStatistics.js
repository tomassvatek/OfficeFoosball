import React from "react";
import "../Statistics.scss";

export default function PlayerStatistics(props) {
    var stats = props.statistics;

    return (
        stats.map((s, index) => {
            return (
                <div className="stats-item row" key={index}>
                    <div className="stats-item__position col-lg-2"><span>{index+1}</span></div>
                    <div className="stats-item__percentage col-lg-4">{s.successPercentage.toFixed(1)}%</div>
                    <div className="stats-item__name col-lg-6">{s.player.name}</div>
                </div>
            );
        })
    );
}