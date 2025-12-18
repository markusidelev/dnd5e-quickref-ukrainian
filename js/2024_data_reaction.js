/*
Template examples (hidden):

// Optional rule example:
// {
//   title: "Example Optional Reaction",
//   optional: "Optional rule",
//   icon: "example-icon",
//   subtitle: "Short subtitle",
//   description: "A short description of the optional reaction.",
//   reference: "PHB, pg. X",
//   bullets: ["Detail 1"]
// }

// Homebrew rule example:
// {
//   title: "Example Homebrew Reaction",
//   optional: "Homebrew rule",
//   icon: "crossed-swords",
//   subtitle: "Homebrew subtitle",
//   description: "Description of homebrew reaction.",
//   reference: "Homebrew",
//   bullets: ["Homebrew detail"]
// }
*/

data_reaction = [
    {
        title: "Opportunity attack",
        optional: "Standard rule",
        icon: "crossed-swords",
        subtitle: "Enemy leaves your reach",
        description: "You can rarely move heedlessly past your foes without putting yourself in danger",
        reference: "PHB, pg. 371.",
        bullets: [
            "Trigger: enemy creature you can see leaves your reach using its action, its Bonus Action, its Reaction or one of its Speeds.",
            "Make one melee attack with a weapon or an unarmed strike against the provoking creature.",
            "The attack occurs right before the creature leaves your reach."
        ]
    },
    {
        title: "Readied action",
        optional: "Standard rule",
        icon: "stopwatch",
        subtitle: "Part of your Ready action",
        description: "Execute the reaction specified by your Ready action",
        reference: "PHB, pg. 372-373.",
        bullets: [
            "Trigger and Reaction: specified by your <i>Ready</i> action."
        ]
    },
    {
        title: "Cast a spell",
        optional: "Standard rule",
        icon: "magic-swirl",
        subtitle: "Cast time of 1 reaction",
        description: "Cast a spell with a casting time of 1 reaction",
        reference: "PHB, pg. 235-238.",
        bullets: [
            "Trigger: specified by the spell.",
            "For further details, see the <i>Cast a spell</i> action."
        ]
    }
]
